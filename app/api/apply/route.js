import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Check if application with this email already exists
    const existingApplication = await Application.findOne({ email: body.email });
    if (existingApplication) {
      return NextResponse.json(
        { message: 'An application with this email already exists. You can only apply once.', success: false },
        { status: 400 }
      );
    }
    
    const newApplication = new Application({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      instagramHandle: body.instagramHandle,
      youtubeHandle: body.youtubeHandle,
      contentNiche: body.contentNiche,
      aesthetics: body.aesthetics,
      portfolioLink: body.portfolioLink,
    });
    
    await newApplication.save();
    
    return NextResponse.json({ 
      message: 'Application submitted successfully', 
      success: true,
      applicationId: newApplication._id,
      email: newApplication.email,
      date: newApplication.createdAt
    });
  } catch (error) {
    console.error('Apply Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}
