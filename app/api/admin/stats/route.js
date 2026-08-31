import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import Challenge from '@/models/Challenge';
import Submission from '@/models/Submission';
import User from '@/models/User';
import { inMemoryStore } from '@/lib/inMemoryStore';

export async function GET() {
  try {
    let totalCreators = 0;
    let pendingApplications = 0;
    let activeChallenges = 0;
    let totalSubmissions = 0;

    try {
      await dbConnect();
      const [approvedAppsCount, usersCount, pendingAppsCount, activeChallengesCount, subsCount] = await Promise.all([
        Application.countDocuments({ status: 'Approved' }),
        User.countDocuments({ role: 'creator' }),
        Application.countDocuments({ status: 'Pending' }),
        Challenge.countDocuments({ status: 'Active' }),
        Submission.countDocuments({})
      ]);

      totalCreators = approvedAppsCount + usersCount;
      pendingApplications = pendingAppsCount;
      activeChallenges = activeChallengesCount;
      totalSubmissions = subsCount;
    } catch (dbErr) {
      console.warn('MongoDB offline, computing stats from in-memory store:', dbErr.message);
      const apps = inMemoryStore.getApplications();
      totalCreators = apps.filter(a => a.status === 'Approved').length;
      pendingApplications = apps.filter(a => a.status === 'Pending').length;
      activeChallenges = inMemoryStore.getChallenges().length;
      totalSubmissions = inMemoryStore.getSubmissions().length;
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalCreators,
        pendingApplications,
        activeChallenges,
        totalSubmissions,
        totalPayouts: '₹14,000'
      }
    });

  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
