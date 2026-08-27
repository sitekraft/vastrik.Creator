import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Submission from '@/models/Submission';

export async function GET() {
  try {
    await dbConnect();
    // In a real scenario, filter by the logged-in user's ID
    const submissions = await Submission.find({}).populate('challenge').sort({ createdAt: -1 });
    return NextResponse.json({ submissions, success: true });
  } catch (error) {
    console.error('Fetch Submissions Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const newSubmission = new Submission({
      user: body.userId, // This should come from the session in a fully auth-secured app
      challenge: body.challengeId,
      contentLink: body.contentLink,
      description: body.description,
      imageUrl: body.imageUrl || '/dashboard_challenge.jpg'
    });
    
    await newSubmission.save();
    return NextResponse.json({ message: 'Submission created successfully', success: true });
  } catch (error) {
    console.error('Create Submission Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}
