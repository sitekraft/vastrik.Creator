import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    const creators = await User.find({ role: 'creator' }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, creators });
  } catch (error) {
    console.error('Fetch creators error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
