const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Since models are written in ES modules and we are running a simple node script, 
// we will just define the schema here for seeding to avoid module import issues in node scripts.
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['creator', 'admin'], default: 'creator' },
  rank: { type: String, default: 'Newbie' },
  points: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  try {
    console.log('Connecting to MongoDB...', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected!');

    // Create Admin User
    const adminEmail = 'admin@vastrik.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
    } else {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const newAdmin = new User({
        name: 'Vastrik Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        rank: 'Icon',
        points: 999999
      });
      await newAdmin.save();
      console.log('Admin user created successfully! (admin@vastrik.com / admin123)');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
