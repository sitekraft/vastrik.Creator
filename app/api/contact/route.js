import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';
import { inMemoryStore } from '@/lib/inMemoryStore';
import { sendMail } from '@/lib/mail';

export async function GET() {
  try {
    try {
      await dbConnect();
      const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, messages });
    } catch (dbErr) {
      console.warn('MongoDB offline, returning in-memory contact messages:', dbErr.message);
      return NextResponse.json({ success: true, messages: inMemoryStore.getContactMessages() });
    }
  } catch (error) {
    console.error('Fetch Contact Messages Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ 
        success: false, 
        message: 'Name, email, and message are required.' 
      }, { status: 400 });
    }

    let ticketId = null;

    try {
      await dbConnect();
      const newMsg = new ContactMessage({
        name,
        email,
        phone,
        subject: subject || 'General Support',
        message
      });
      await newMsg.save();
      ticketId = newMsg._id.toString();
    } catch (dbErr) {
      console.warn('MongoDB offline, saving contact message in-memory:', dbErr.message);
      const saved = inMemoryStore.addContactMessage(body);
      ticketId = saved._id;
    }

    if (!ticketId) {
      const saved = inMemoryStore.addContactMessage(body);
      ticketId = saved._id;
    }

    // Send email to Vastrik Support
    try {
      const emailHtml = `
        <h2>New Support Ticket Submitted</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Category:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `;
      await sendMail({
        to: 'vastrik.support@gmail.com',
        subject: `[Support Ticket] ${subject} - from ${name}`,
        html: emailHtml
      });
    } catch (mailErr) {
      console.error('Failed to send support email:', mailErr);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Your support ticket has been received! Our team will reply within 24 hours.',
      ticketId
    });

  } catch (error) {
    console.error('Submit Contact Message Error:', error);
    try {
      const saved = inMemoryStore.addContactMessage(body || {});
      return NextResponse.json({ 
        success: true, 
        message: 'Your message has been received! Our support desk will reach out shortly.',
        ticketId: saved._id 
      });
    } catch (e) {
      return NextResponse.json({ success: false, message: error.message || 'Server error while submitting message.' }, { status: 500 });
    }
  }
}

