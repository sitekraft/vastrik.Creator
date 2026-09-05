import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import Challenge from '@/models/Challenge';
import Submission from '@/models/Submission';
import User from '@/models/User';
import { inMemoryStore } from '@/lib/inMemoryStore';

import Payout from '@/models/Payout';

export async function GET() {
  try {
    let totalCreators = 0;
    let pendingApplications = 0;
    let activeChallenges = 0;
    let totalSubmissions = 0;
    let totalPayoutsValue = 0;

    try {
      await dbConnect();
      const [usersCount, pendingAppsCount, activeChallengesCount, subsCount, payouts] = await Promise.all([
        User.countDocuments({ role: 'creator' }),
        Application.countDocuments({ status: 'Pending' }),
        Challenge.countDocuments({ status: 'Active' }),
        Submission.countDocuments({}),
        Payout.find({ status: 'Paid' }).lean()
      ]);

      totalCreators = usersCount;
      pendingApplications = pendingAppsCount;
      activeChallenges = activeChallengesCount;
      totalSubmissions = subsCount;
      
      totalPayoutsValue = payouts.reduce((sum, p) => sum + (parseFloat(p.amount.toString().replace(/[^0-9.-]+/g,"")) || 0), 0);
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
        totalPayouts: `₹${totalPayoutsValue.toLocaleString()}`
      }
    });

  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
