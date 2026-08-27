import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  contentLink: { type: String, required: true },
  imageUrl: { type: String }, // Thumbnail
  description: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  views: { type: Number, default: 0 },
  pointsEarned: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
