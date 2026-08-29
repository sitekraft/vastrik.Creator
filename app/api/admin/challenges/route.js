import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Challenge from '@/models/Challenge';

export async function GET() {
  try {
    await dbConnect();
    const challenges = await Challenge.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ challenges, success: true });
  } catch (error) {
    console.error('Fetch Challenges Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const newChallenge = new Challenge({
      title: body.title,
      description: body.description,
      rewardPool: body.rewardPool,
      startDate: body.startDate,
      endDate: body.endDate,
      coverImage: body.coverImage || '/promo.jpg'
    });
    
    await newChallenge.save();
    return NextResponse.json({ message: 'Challenge created successfully', success: true });
  } catch (error) {
    console.error('Create Challenge Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}
