import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Challenge from '@/models/Challenge';
import { inMemoryStore } from '@/lib/inMemoryStore';

export async function GET() {
  try {
    try {
      await dbConnect();
      const challenges = await Challenge.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ challenges, success: true });
    } catch (dbErr) {
      console.warn('MongoDB offline, returning in-memory challenges:', dbErr.message);
      return NextResponse.json({ challenges: inMemoryStore.getChallenges(), success: true });
    }
  } catch (error) {
    console.error('Fetch Challenges Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    try {
      await dbConnect();
      const newChallenge = new Challenge({
        title: body.title,
        description: body.description,
        rewardPool: body.rewardPool,
        startDate: body.startDate,
        endDate: body.endDate,
        coverImage: body.coverImage || '/promo.jpg'
      });
      
      await newChallenge.save();
    } catch (dbErr) {
      console.warn('MongoDB offline, saving challenge in-memory:', dbErr.message);
      inMemoryStore.challenges.unshift({ ...body, _id: '66d0' + Date.now().toString(16) });
    }

    return NextResponse.json({ message: 'Challenge created successfully', success: true });
  } catch (error) {
    console.error('Create Challenge Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}

