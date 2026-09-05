import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Submission from '@/models/Submission';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await dbConnect();
    
    const submission = await Submission.findById(id).lean();
    
    if (!submission) {
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error('Fetch submission error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
