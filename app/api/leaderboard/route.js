import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    const leaders = await User.find({ role: 'creator' })
      .sort({ points: -1 })
      .limit(50); // Get top 50 creators
    
    return NextResponse.json({ success: true, leaders });
  } catch (error) {
    console.error('Fetch leaderboard error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
