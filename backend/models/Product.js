const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Aerospace Composites', 'Architectural Acoustic', 'Industrial Technical', 'Protective & Ballistic', 'Bio-Synthetic Performance'],
    },
    description: {
      type: String,
      required: true,
    },
    composition: {
      type: String,
      required: true,
    },
    weightGsm: {
      type: Number,
      required: true,
    },
    widthCm: {
      type: Number,
      default: 140,
    },
    rollLengthM: {
      type: Number,
      default: 50,
    },
    tensileStrengthMpa: {
      type: Number,
      required: true,
    },
    abrasionMartindale: {
      type: Number,
      required: true,
    },
    flameCertification: {
      type: String,
      required: true,
    },
    certifications: [
      {
        type: String,
      },
    ],
    leadTimeWeeks: {
      type: Number,
      default: 3,
    },
    pricePerMeter: {
      type: Number,
      required: true,
    },
    moqMeters: {
      type: Number,
      default: 100,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockMeters: {
      type: Number,
      default: 1200,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    swatchColors: [
      {
        name: String,
        hex: String,
      },
    ],
    technicalSpecs: {
      weavePattern: String,
      yarnCount: String,
      airPermeability: String,
      thermalConductivity: String,
      acousticNrc: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
