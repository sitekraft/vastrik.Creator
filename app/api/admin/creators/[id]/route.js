import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Payout from '@/models/Payout';
import { sendMail } from '@/lib/mail';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const id = params.id;
    
    const user = await User.findById(id).lean();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Creator not found' }, { status: 404 });
    }

    // Calculate total payouts
    const payouts = await Payout.find({ creatorId: id, status: 'Paid' }).lean();
    const totalPayouts = payouts.reduce((sum, p) => sum + (parseFloat(p.amount.toString().replace(/[^0-9.-]+/g,"")) || 0), 0);

    return NextResponse.json({ 
      success: true, 
      creator: {
        id: user._id,
        name: user.name,
        email: user.email,
        joinDate: new Date(user.createdAt).toLocaleDateString(),
        rank: user.rank || 'Newbie',
        points: user.points || 0,
        totalEarned: `₹${totalPayouts.toLocaleString()}`,
        status: user.status || 'Active',
        warnings: user.warnings || 0
      }
    });
  } catch (error) {
    console.error('Error fetching creator:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const id = params.id;
    const body = await request.json();
    const { action } = body;

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: 'Creator not found' }, { status: 404 });
    }

    if (action === 'Issue Warning') {
      user.warnings = (user.warnings || 0) + 1;
    } else if (action === 'Reset Points') {
      user.points = 0;
    } else if (action === 'Suspend Account') {
      user.status = 'Suspended';
    } else if (action === 'Process Payout') {
      if (!user.points || user.points <= 0) {
        return NextResponse.json({ success: false, message: 'Creator has 0 points to pay' }, { status: 400 });
      }
      
      const payoutAmount = `₹${user.points.toLocaleString()}`;
      
      await Payout.create({
        creatorId: user._id,
        creatorName: user.name,
        amount: payoutAmount,
        method: user.bankDetails?.upiId || 'UPI',
        status: 'Paid'
      });
      
      user.points = 0;
      
      // Send Email
      if (user.email) {
        const emailHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #4ade80;">Payment Processed! 💸</h2>
            <p>Hi ${user.name},</p>
            <p>We have successfully processed your payout of <strong>${payoutAmount}</strong> to your registered payment method.</p>
            <p>Thank you for being one of the top creators on Vastrik!</p>
            <a href="http://localhost:3000/dashboard" style="display: inline-block; padding: 10px 20px; background-color: #6366f1; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px;">View Dashboard</a>
          </div>
        `;
        await sendMail({
          to: user.email,
          subject: 'Your Vastrik Payout has been Processed! 💸',
          html: emailHtml
        });
      }
    }

    await user.save();

    return NextResponse.json({ success: true, message: `Action "${action}" completed.`, user });
  } catch (error) {
    console.error('Error updating creator:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
