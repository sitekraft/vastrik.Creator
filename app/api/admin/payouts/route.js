import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    // Assuming Payouts model doesn't exist yet, we return an empty array
    // Once the Payout model is ready, we'll fetch from it.
    const payouts = [];
    return NextResponse.json({ success: true, payouts });
  } catch (error) {
    console.error('Fetch payouts error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
