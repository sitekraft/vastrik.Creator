import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  instagramHandle: { type: String },
  youtubeHandle: { type: String },
  contentNiche: { type: String },
  aesthetics: { type: String },
  portfolioLink: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
