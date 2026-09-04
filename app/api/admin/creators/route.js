import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Application from '@/models/Application';

export async function GET() {
  try {
    await dbConnect();
    
    // Sort by leaderboard points (descending)
    const users = await User.find({ role: 'creator' }).sort({ points: -1 }).lean();
    
    // Get all approved applications to find their IDs
    const applications = await Application.find({ status: 'Approved' }).lean();
    const appMap = applications.reduce((acc, app) => {
      acc[app.email] = app._id;
      return acc;
    }, {});

    const creators = users.map(user => ({
      ...user,
      applicationId: appMap[user.email] || 'N/A'
    }));

    return NextResponse.json({ success: true, creators });
  } catch (error) {
    console.error('Fetch creators error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
