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
      // If user doesn't exist yet, we can't really update them in this simple flow, but ideally they'd be created upon application approval.
      // For now, just return an error or pretend success.
      return NextResponse.json({ success: false, message: 'User not found in DB yet. Please apply first.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
