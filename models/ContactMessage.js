import mongoose from 'mongoose';

const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, default: 'General Support' },
  message: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema);
