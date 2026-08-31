import mongoose from 'mongoose';

const CollaborationSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  businessEmail: { type: String, required: true },
  phone: { type: String },
  collaborationType: { type: String, default: 'Creator Campaign' },
  budgetRange: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'In Discussion', 'Closed'], default: 'New' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Collaboration || mongoose.model('Collaboration', CollaborationSchema);
