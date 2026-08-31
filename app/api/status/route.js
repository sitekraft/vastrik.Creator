import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import { inMemoryStore } from '@/lib/inMemoryStore';
import mongoose from 'mongoose';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || searchParams.get('email') || searchParams.get('id');

    if (!query) {
      return NextResponse.json({ success: false, message: 'Please provide an email or Application ID to search.' }, { status: 400 });
    }

    let application = null;

    try {
      await dbConnect();

      // Check if query is a valid MongoDB ObjectId
      if (mongoose.Types.ObjectId.isValid(query) && query.length === 24) {
        application = await Application.findById(query);
      }

      // If not found by ID, search by email or instagram
      if (!application) {
        const cleanEmail = query.trim().toLowerCase();
        application = await Application.findOne({ 
          $or: [
            { email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') } },
            { instagramHandle: { $regex: new RegExp(`^${query.trim()}$`, 'i') } }
          ]
        }).sort({ createdAt: -1 });
      }
    } catch (dbErr) {
      console.warn('MongoDB connection offline, searching in-memory store:', dbErr.message);
      application = inMemoryStore.findApplicationByEmail(query) || inMemoryStore.findApplicationById(query);
    }

    // Fallback to in-memory store if DB query returned nothing
    if (!application) {
      application = inMemoryStore.findApplicationByEmail(query) || inMemoryStore.findApplicationById(query);
    }

    if (!application) {
      return NextResponse.json({ 
        success: false, 
        notFound: true, 
        message: 'No creator application found matching this email or ID. Please check your spelling or apply to join!' 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      application: {
        id: application._id ? application._id.toString() : application.id,
        fullName: application.fullName,
        email: application.email,
        instagramHandle: application.instagramHandle,
        contentNiche: application.contentNiche,
        status: application.status,
        createdAt: application.createdAt
      }
    });

  } catch (error) {
    console.error('Status Check Error:', error);
    return NextResponse.json({ success: false, message: 'Server error while checking status.' }, { status: 500 });
  }
}

