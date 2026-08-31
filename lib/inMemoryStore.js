// In-memory mock store for seamless local development and testing when MongoDB service is offline

class InMemoryStore {
  constructor() {
    this.applications = [
      {
        _id: '66d01234567890abcdef1001',
        fullName: 'Aarav Mehta',
        email: 'aarav@vastrik.com',
        phone: '9876543210',
        instagramHandle: '@aarav.style',
        contentNiche: 'Streetwear & Minimalist',
        status: 'Approved',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '66d01234567890abcdef1002',
        fullName: 'Priya Sharma',
        email: 'priya@vastrik.com',
        phone: '9812345678',
        instagramHandle: '@priyacouture',
        contentNiche: 'Festive & Bridal Styling',
        status: 'Pending',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    this.challenges = [
      {
        _id: '66d01234567890abcdef2001',
        title: 'PINTEREST & CELEB LOOK DECONSTRUCT',
        description: 'Find a viral Pinterest or celebrity outfit, show the crazy designer price tag, and demonstrate on screen how anyone can upload that photo to vastrik.store to get it custom stitched by master karigars.',
        rewardPool: '₹5,000 for 1M+ Views',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Active'
      },
      {
        _id: '66d01234567890abcdef2002',
        title: 'AI SKETCH ANALYZER TEST & REACTION',
        description: 'Test Vastrik\'s AI Sketch Analyzer (vastrik.store/#analyzer) on camera. Drop design sketches or moodboard photos, show the live fabric breakdown, and share your genuine reaction.',
        rewardPool: '₹5,000 for 1M+ Views',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Active'
      }
    ];

    this.submissions = [];
    this.collaborations = [];
    this.contactMessages = [];
  }

  addApplication(app) {
    const newApp = {
      _id: '66d0' + Math.random().toString(16).slice(2, 22),
      ...app,
      status: app.status || 'Pending',
      createdAt: new Date().toISOString()
    };
    this.applications.unshift(newApp);
    return newApp;
  }

  findApplicationByEmail(email) {
    if (!email) return null;
    const clean = email.trim().toLowerCase();
    return this.applications.find(a => a.email && a.email.toLowerCase() === clean);
  }

  findApplicationById(id) {
    if (!id) return null;
    return this.applications.find(a => a._id === id || a._id.toString().endsWith(id.replace('#VST-', '')));
  }

  getApplications() {
    return this.applications;
  }

  getChallenges() {
    return this.challenges;
  }

  addSubmission(sub) {
    const newSub = {
      _id: '66d0' + Math.random().toString(16).slice(2, 22),
      ...sub,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    this.submissions.unshift(newSub);
    return newSub;
  }

  getSubmissions() {
    return this.submissions;
  }

  addCollaboration(collab) {
    const newCollab = {
      _id: '66d0' + Math.random().toString(16).slice(2, 22),
      ...collab,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    this.collaborations.unshift(newCollab);
    return newCollab;
  }

  getCollaborations() {
    return this.collaborations;
  }

  addContactMessage(msg) {
    const newMsg = {
      _id: '66d0' + Math.random().toString(16).slice(2, 22),
      ...msg,
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    this.contactMessages.unshift(newMsg);
    return newMsg;
  }

  getContactMessages() {
    return this.contactMessages;
  }
}


// Ensure prototype methods are always attached
const globalStoreKey = Symbol.for('vastrik.inMemoryStore_v2');
if (!global[globalStoreKey]) {
  global[globalStoreKey] = new InMemoryStore();
}

export const inMemoryStore = global[globalStoreKey];

