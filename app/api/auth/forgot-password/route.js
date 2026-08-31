import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { sendMail } from '@/lib/mail';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      // Don't leak whether the user exists or not
      return NextResponse.json({ success: true, message: 'If an account exists, a reset link was sent.' });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/reset-password?token=${resetToken}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0710; color: #fff; border: 1px solid #ef4444; border-radius: 10px;">
        <h2 style="color: #ef4444;">Vastrik Admin Security</h2>
        <p>A password reset was requested for your admin account.</p>
        <p>Click the button below to set a new security key. This link is valid for 1 hour.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: #ef4444; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
        </div>
        <p style="font-size: 12px; color: #aaa;">If you did not request this, please ignore this email.</p>
      </div>
    `;

    await sendMail({
      to: user.email,
      subject: 'Vastrik Admin - Password Reset',
      html
    });

    return NextResponse.json({ success: true, message: 'If an account exists, a reset link was sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
