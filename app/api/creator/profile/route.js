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
      return NextResponse.json({ success: true, profile: { points: user.points, rank: user.rank } });
    }

    // If no user record yet (just approved application), default points to 0
    return NextResponse.json({ success: true, profile: { points: 0, rank: 'Newbie' } });
    
  } catch (error) {
    console.error('Fetch profile error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
