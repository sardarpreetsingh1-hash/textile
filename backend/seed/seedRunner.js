const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Meeting = require('../models/Meeting');
const SampleRequest = require('../models/SampleRequest');
const { initialProducts, initialOrders, initialMeetings, initialSampleRequests } = require('./seedData');

dotenv.config();

const seedAll = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri || uri.includes('<username>')) {
      console.log('Cannot run CLI seeder without valid MONGODB_URI in .env');
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log('Connected to MongoDB. Clearing existing collections...');

    await Product.deleteMany();
    await Order.deleteMany();
    await Meeting.deleteMany();
    await SampleRequest.deleteMany();

    console.log('Inserting seed records...');
    await Product.insertMany(initialProducts);
    await Order.insertMany(initialOrders);
    await Meeting.insertMany(initialMeetings);
    await SampleRequest.insertMany(initialSampleRequests);

    console.log('✅ Database seeded successfully with Texora B2B dataset!');
    process.exit(0);
  } catch (err) {
    console.error('Seed Error:', err);
    process.exit(1);
  }
};

seedAll();
