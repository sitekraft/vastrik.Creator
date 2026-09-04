import mongoose from 'mongoose';

const PayoutSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creatorName: { type: String, required: true },
  amount: { type: String, required: true },
  method: { type: String, default: 'UPI' },
  requestDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.models.Payout || mongoose.model('Payout', PayoutSchema);
