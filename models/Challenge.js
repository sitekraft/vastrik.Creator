import mongoose from 'mongoose';

const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String }, // URL to image
  rewardPool: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Upcoming', 'Active', 'Completed'], default: 'Active' },
}, { timestamps: true });

export default mongoose.models.Challenge || mongoose.model('Challenge', ChallengeSchema);
