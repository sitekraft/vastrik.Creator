import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Submission from '@/models/Submission';
import { inMemoryStore } from '@/lib/inMemoryStore';

export async function GET() {
  try {
    try {
      await dbConnect();
      const submissions = await Submission.find({}).populate('challenge').sort({ createdAt: -1 });
      return NextResponse.json({ submissions, success: true });
    } catch (dbErr) {
      console.warn('MongoDB offline, returning in-memory submissions:', dbErr.message);
      return NextResponse.json({ submissions: inMemoryStore.getSubmissions(), success: true });
    }
  } catch (error) {
    console.error('Fetch Submissions Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    try {
      await dbConnect();
      const newSubmission = new Submission({
        user: body.userId,
        challenge: body.challengeId,
        contentLink: body.contentLink,
        description: body.description,
        imageUrl: body.imageUrl || '/dashboard_challenge.jpg'
      });
      
      await newSubmission.save();
    } catch (dbErr) {
      console.warn('MongoDB offline, saving submission in-memory:', dbErr.message);
      inMemoryStore.addSubmission(body);
    }

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status, points = 500 } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Submission ID and status are required.' }, { status: 400 });
    }

    try {
      await dbConnect();
      await Submission.findByIdAndUpdate(id, { 
        status, 
        pointsEarned: status === 'Approved' ? points : 0 
      });
    } catch (dbErr) {
      console.warn('MongoDB offline, updating submission in-memory:', dbErr.message);
    }

    const inMemSub = inMemoryStore.submissions.find(s => s._id === id);
    if (inMemSub) {
      inMemSub.status = status;
      inMemSub.pointsEarned = status === 'Approved' ? points : 0;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Submission ${status} and ${points} points awarded!` 
    });
  } catch (error) {
    console.error('Update Submission Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}


