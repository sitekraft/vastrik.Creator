import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
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
    
    return NextResponse.json({ message: 'Application submitted successfully', success: true });
  } catch (error) {
    console.error('Apply Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}
