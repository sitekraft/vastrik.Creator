import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import User from '@/models/User';
import { inMemoryStore } from '@/lib/inMemoryStore';
import { sendMail } from '@/lib/mail';

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

    // Handle user creation and email sending if approved
    if (updated && status === 'Approved') {
      try {
        await dbConnect();
        const existingUser = await User.findOne({ email: updated.email });
        if (!existingUser) {
          await User.create({
            name: updated.fullName,
            email: updated.email,
            password: 'password123', // Dummy password for prototype login
            role: 'creator',
            points: 0,
            rank: 'Newbie',
            status: 'Active'
          });
        }
      } catch (err) {
        console.error('Failed to create user:', err);
      }

      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #6366f1;">Congratulations! 🎉</h2>
          <p>Hi ${updated.fullName},</p>
          <p>Your application to join Vastrik as a creator has been <strong>Approved</strong>!</p>
          <p>You can now access your dashboard instantly using the magic link below. No password required!</p>
          <a href="http://localhost:3000/dashboard?auth=${encodeURIComponent(updated.email)}" style="display: inline-block; padding: 10px 20px; background-color: #6366f1; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px;">Go to Dashboard</a>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">Welcome to the Vastrik community.</p>
        </div>
      `;
      await sendMail({
        to: updated.email,
        subject: 'Your Vastrik Creator Application is Approved! 🎉',
        html: emailHtml
      });
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


