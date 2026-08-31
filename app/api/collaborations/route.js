import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Collaboration from '@/models/Collaboration';
import { inMemoryStore } from '@/lib/inMemoryStore';

export async function GET() {
  try {
    try {
      await dbConnect();
      const collabs = await Collaboration.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, collaborations: collabs });
    } catch (dbErr) {
      console.warn('MongoDB offline, returning in-memory collaborations:', dbErr.message);
      return NextResponse.json({ success: true, collaborations: inMemoryStore.getCollaborations() });
    }
  } catch (error) {
    console.error('Fetch Collaborations Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { brandName, contactPerson, businessEmail, phone, collaborationType, budgetRange, message } = body;

    if (!brandName || !contactPerson || !businessEmail || !message) {
      return NextResponse.json({ 
        success: false, 
        message: 'Please provide brand name, contact person, email, and message.' 
      }, { status: 400 });
    }

    let collabId = null;

    try {
      await dbConnect();
      const newCollab = new Collaboration({
        brandName,
        contactPerson,
        businessEmail,
        phone,
        collaborationType: collaborationType || 'Creator Campaign',
        budgetRange: budgetRange || '₹50,000 - ₹2,00,000',
        message
      });
      await newCollab.save();
      collabId = newCollab._id.toString();
    } catch (dbErr) {
      console.warn('MongoDB offline, saving collaboration in-memory:', dbErr.message);
      const saved = inMemoryStore.addCollaboration(body);
      collabId = saved._id;
    }

    if (!collabId) {
      const saved = inMemoryStore.addCollaboration(body);
      collabId = saved._id;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Collaboration inquiry submitted successfully! The Vastrik Brand Partnerships team will reach out within 24 hours.',
      inquiryId: collabId
    });

  } catch (error) {
    console.error('Submit Collaboration Error:', error);
    // Fallback: save to in-memory store even on unhandled exception
    try {
      const saved = inMemoryStore.addCollaboration(body || {});
      return NextResponse.json({ 
        success: true, 
        message: 'Collaboration inquiry submitted successfully! The Vastrik team will reach out shortly.',
        inquiryId: saved._id 
      });
    } catch (e) {
      return NextResponse.json({ success: false, message: error.message || 'Server error while submitting inquiry.' }, { status: 500 });
    }
  }
}

