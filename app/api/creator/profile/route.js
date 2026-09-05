import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });
    }

    await dbConnect();
    
    // Find creator by email in User model to get their real points
    const user = await User.findOne({ email, role: 'creator' });
    
    if (user) {
      return NextResponse.json({ 
        success: true, 
        profile: { 
          name: user.name,
          email: user.email,
          points: user.points, 
          rank: user.rank,
          upiId: user.bankDetails?.upiId || '',
          notifications: user.notifications || { email: true, sms: false }
        } 
      });
    }

    // If no user record yet (just approved application), default points to 0
    return NextResponse.json({ 
      success: true, 
      profile: { 
        name: 'Creator',
        email: email,
        points: 0, 
        rank: 'Newbie',
        upiId: '',
        notifications: { email: true, sms: false }
      } 
    });
    
  } catch (error) {
    console.error('Fetch profile error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { email, name, upiId, notifications } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });
    }

    await dbConnect();

    // Find and update the user
    let user = await User.findOne({ email, role: 'creator' });
    
    if (user) {
      user.name = name || user.name;
      if (upiId !== undefined) {
        if (!user.bankDetails) user.bankDetails = {};
        user.bankDetails.upiId = upiId;
      }
      if (notifications) {
        user.notifications = {
          ...user.notifications,
          ...notifications
        };
      }
      await user.save();
    } else {
      // Create user if they somehow have access but no record
      const newUser = new User({
        name: name || 'Creator',
        email: email,
        password: 'magic-link-login', // Dummy password since they use magic link
        role: 'creator',
        rank: 'Newbie',
        points: 0,
        bankDetails: { upiId: upiId || '' },
        notifications: notifications || { email: true, sms: false }
      });
      await newUser.save();
    }

    return NextResponse.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
