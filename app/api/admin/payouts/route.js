import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Payout from '@/models/Payout';
import User from '@/models/User';
import { sendMail } from '@/lib/mail';

export async function GET() {
  try {
    await dbConnect();
    
    // Auto-generate payouts for Top 3 creators (if not already generated)
    const topCreators = await User.find({ role: 'creator', points: { $gt: 0 } })
      .sort({ points: -1 })
      .limit(3);

    for (const creator of topCreators) {
      // For the prototype, we check if they have ANY payout. 
      // In reality, this might be checked per month or challenge.
      const existingPayout = await Payout.findOne({ creatorId: creator._id });
      
      if (!existingPayout) {
        // Assume 1 Point = 1 INR for display
        await Payout.create({
          creatorId: creator._id,
          creatorName: creator.name,
          amount: `₹${creator.points.toLocaleString()}`,
          method: creator.bankDetails?.upiId || 'UPI',
          status: 'Pending'
        });
      }
    }

    const payouts = await Payout.find().sort({ requestDate: -1 }).lean();
    
    return NextResponse.json({ success: true, payouts });
  } catch (error) {
    console.error('Fetch payouts error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    await dbConnect();

    const updatedPayout = await Payout.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!updatedPayout) {
      return NextResponse.json({ success: false, message: 'Payout not found' }, { status: 404 });
    }

    // If marked as Paid, send an email to the creator
    if (status === 'Paid') {
      const creator = await User.findById(updatedPayout.creatorId);
      if (creator && creator.email) {
        const emailHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #4ade80;">Payment Processed! 💸</h2>
            <p>Hi ${updatedPayout.creatorName},</p>
            <p>We have successfully processed your payout of <strong>${updatedPayout.amount}</strong> to your registered payment method (${updatedPayout.method}).</p>
            <p>Thank you for being one of the top creators on Vastrik!</p>
            <a href="http://localhost:3000/dashboard" style="display: inline-block; padding: 10px 20px; background-color: #6366f1; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px;">View Dashboard</a>
          </div>
        `;
        await sendMail({
          to: creator.email,
          subject: 'Your Vastrik Payout has been Processed! 💸',
          html: emailHtml
        });
      }
    }

    return NextResponse.json({ success: true, payout: updatedPayout });
  } catch (error) {
    console.error('Update payout error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
