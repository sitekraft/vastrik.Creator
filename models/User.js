import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  role: { type: String, enum: ['creator', 'admin'], default: 'creator' },
  instagramHandle: { type: String },
  youtubeHandle: { type: String },
  rank: { type: String, enum: ['Newbie', 'Elite', 'Icon'], default: 'Newbie' },
  points: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Suspended'], default: 'Active' },
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    upiId: String
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
