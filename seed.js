import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String },
  rewardPool: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Upcoming', 'Active', 'Completed'], default: 'Active' },
}, { timestamps: true });

const Challenge = mongoose.models.Challenge || mongoose.model('Challenge', ChallengeSchema);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Wipe existing challenges
    await Challenge.deleteMany({});
    console.log('Cleared existing challenges');

    const challenges = [
      {
        title: 'PINTEREST & CELEB LOOK DECONSTRUCT',
        description: 'Find a viral Pinterest or celebrity outfit, show the crazy designer price tag, and demonstrate on screen how anyone can upload that photo to vastrik.store to get it custom stitched by master karigars.',
        rewardPool: '₹5,000 / 1M Views',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1 month from now
        status: 'Active',
        coverImage: '/dashboard_challenge.jpg'
      },
      {
        title: 'AI SKETCH ANALYZER TEST & REACTION',
        description: "Test Vastrik's AI Sketch Analyzer (vastrik.store/#analyzer) on camera. Drop design sketches or moodboard photos, show the live fabric breakdown, and share your genuine reaction.",
        rewardPool: '₹5,000 / 1M Views',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        status: 'Active',
        coverImage: ''
      },
      {
        title: 'STANDARD SIZING STRUGGLES vs VASTRIK',
        description: "Talk about the universal struggle of off-the-rack clothes that never fit, and introduce Vastrik's 100% custom-fit solution where Indian master tailors stitch to exact body measurements.",
        rewardPool: '₹5,000 / 1M Views',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        status: 'Active',
        coverImage: ''
      }
    ];

    await Challenge.insertMany(challenges);
    console.log('Seeded challenges successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding challenges:', error);
    process.exit(1);
  }
}

seed();
