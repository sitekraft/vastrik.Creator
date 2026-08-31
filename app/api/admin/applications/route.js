import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import { inMemoryStore } from '@/lib/inMemoryStore';

export async function GET() {
  try {
    try {
      await dbConnect();
      const applications = await Application.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ applications, success: true });
    } catch (dbErr) {
      console.warn('MongoDB offline, returning in-memory applications:', dbErr.message);
      return NextResponse.json({ applications: inMemoryStore.getApplications(), success: true });
    }
  } catch (error) {
    console.error('Fetch Applications Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}

export async function PATCH(request) {

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Application ID and status are required.' }, { status: 400 });
    }

    let updated = null;

    try {
      await dbConnect();
      updated = await Application.findByIdAndUpdate(id, { status }, { new: true });
    } catch (dbErr) {
      console.warn('MongoDB offline, updating in-memory status:', dbErr.message);
    }

    // Update in inMemoryStore
    const inMemApp = inMemoryStore.findApplicationById(id);
    if (inMemApp) {
      inMemApp.status = status;
      updated = inMemApp;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Application ${status} successfully!`, 
      application: updated 
    });
  } catch (error) {
    console.error('Update Application Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}


