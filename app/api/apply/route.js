import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import { inMemoryStore } from '@/lib/inMemoryStore';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Check if application with this email already exists
    const existingApplication = await Application.findOne({ email: body.email });
    if (existingApplication) {
      return NextResponse.json(
        { message: 'An application with this email already exists. You can only apply once.', success: false },
        { status: 400 }
      );
    }
    
    let appId = null;

    try {
      await dbConnect();
      
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
      appId = newApplication._id.toString();
    } catch (dbErr) {
      console.warn('MongoDB offline, saving to in-memory store:', dbErr.message);
      const saved = inMemoryStore.addApplication(body);
      appId = saved._id;
    }

    // Also sync to inMemoryStore so instant client search works without DB roundtrip
    inMemoryStore.addApplication({ ...body, _id: appId });
    
    return NextResponse.json({ 
      message: 'Application submitted successfully', 
      success: true,
      applicationId: appId 
    });
  } catch (error) {
    console.error('Apply Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}


