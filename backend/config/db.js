const mongoose = require('mongoose');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Meeting = require('../models/Meeting');
const SampleRequest = require('../models/SampleRequest');
const { initialProducts, initialOrders, initialMeetings, initialSampleRequests } = require('../seed/seedData');

// In-memory memory store fallback if MongoDB Atlas is pending network configuration
const memoryStore = {
  isUsingMemory: false,
  products: [...initialProducts.map((p, idx) => ({ ...p, _id: `mem_prod_${idx + 1}` }))],
  orders: [...initialOrders.map((o, idx) => ({ ...o, _id: `mem_ord_${idx + 1}` }))],
  meetings: [...initialMeetings.map((m, idx) => ({ ...m, _id: `mem_meet_${idx + 1}` }))],
  samples: [...initialSampleRequests.map((s, idx) => ({ ...s, _id: `mem_samp_${idx + 1}` }))],
};

const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Seeding initial textile products...');
      await Product.insertMany(initialProducts);
      console.log('Textile products seeded successfully.');
    }

    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      console.log('Seeding initial shipment orders...');
      await Order.insertMany(initialOrders);
      console.log('Shipment orders seeded successfully.');
    }

    const meetingCount = await Meeting.countDocuments();
    if (meetingCount === 0) {
      console.log('Seeding initial consultation bookings...');
      await Meeting.insertMany(initialMeetings);
      console.log('Consultation bookings seeded successfully.');
    }

    const sampleCount = await SampleRequest.countDocuments();
    if (sampleCount === 0) {
      console.log('Seeding initial sample requests...');
      await SampleRequest.insertMany(initialSampleRequests);
      console.log('Sample requests seeded successfully.');
    }
  } catch (err) {
    console.error('Error auto-seeding MongoDB data:', err.message);
  }
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('<username>') || uri.includes('user:password')) {
    console.log('⚠️ [MongoDB Info]: Live Atlas credentials in .env are placeholder. Operating in resilient In-Memory seed mode.');
    console.log('👉 To connect to live MongoDB Atlas: Update MONGODB_URI in backend/.env with your real credentials.');
    memoryStore.isUsingMemory = true;
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ [MongoDB Connected]: ${conn.connection.host}`);
    await seedDatabase();
  } catch (err) {
    console.warn(`⚠️ [MongoDB Warning]: Could not connect to Atlas (${err.message}). Using In-Memory Fallback.`);
    console.warn('👉 Check your IP Whitelist and user credentials in MongoDB Atlas dashboard.');
    memoryStore.isUsingMemory = true;
  }
};

module.exports = { connectDB, memoryStore };
