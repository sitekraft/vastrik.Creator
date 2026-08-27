import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';

export async function GET() {
  try {
    await dbConnect();
    const applications = await Application.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ applications, success: true });
  } catch (error) {
    console.error('Fetch Applications Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}
