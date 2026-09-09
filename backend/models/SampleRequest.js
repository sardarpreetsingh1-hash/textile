const mongoose = require('mongoose');

const sampleRequestSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '',
    },
    industrySector: {
      type: String,
      default: 'Architecture & Interior',
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    sampleItems: [
      {
        sku: String,
        name: String,
        color: String,
        sampleType: {
          type: String,
          default: 'A4 Swatch Binder',
        },
      },
    ],
    projectEstimatedMeters: {
      type: Number,
      default: 500,
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Received', 'Preparing Dispatch', 'Shipped', 'Delivered'],
      default: 'Received',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SampleRequest', sampleRequestSchema);
