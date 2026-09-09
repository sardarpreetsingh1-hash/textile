const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      default: 'Texora High-Precision Loom Mill 4, Lyon / Stuttgart',
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    estimatedDelivery: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Production', 'Quality Check', 'Packed', 'In Transit', 'Customs Cleared', 'Delivered'],
      default: 'Production',
    },
    currentStageIndex: {
      type: Number,
      default: 2, // 0-6
    },
    totalVolumeMeters: {
      type: Number,
      required: true,
    },
    totalAmountUsd: {
      type: Number,
      required: true,
    },
    carrier: {
      type: String,
      default: 'DHL Global Forwarding Aero Cargo',
    },
    trackingCode: {
      type: String,
      default: 'DH-8849-01129-EU',
    },
    billOfLading: {
      type: String,
      default: 'BL-TEX-99201',
    },
    items: [
      {
        sku: String,
        name: String,
        meters: Number,
        unitPrice: Number,
      },
    ],
    timeline: [
      {
        stage: String,
        date: String,
        time: String,
        location: String,
        description: String,
        completed: Boolean,
        active: Boolean,
      },
    ],
    telemetry: {
      currentTemperatureC: {
        type: Number,
        default: 19.4,
      },
      relativeHumidityPct: {
        type: Number,
        default: 44.2,
      },
      vibrationG: {
        type: Number,
        default: 0.08,
      },
      gpsLocation: {
        type: String,
        default: '48.8566° N, 2.3522° E (En Route to Rotterdam Port)',
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
