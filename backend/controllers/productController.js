const Product = require('../models/Product');
const { memoryStore } = require('../config/db');

// @desc    Get all products with optional filter & search
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const { category, search, flameCert, minTensile, inStock } = req.query;

    if (memoryStore.isUsingMemory) {
      let filtered = [...memoryStore.products];
      if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      if (flameCert) {
        filtered = filtered.filter(p => p.flameCertification.toLowerCase().includes(flameCert.toLowerCase()));
      }
      return res.json({ success: true, count: filtered.length, data: filtered });
    }

    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { composition: { $regex: search, $options: 'i' } },
      ];
    }
    if (flameCert) {
      query.flameCertification = { $regex: flameCert, $options: 'i' };
    }
    if (inStock === 'true') {
      query.inStock = true;
    }

    const products = await Product.find(query).sort({ isFeatured: -1, createdAt: -1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product by SKU or ID
// @route   GET /api/products/:identifier
exports.getProductByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;

    if (memoryStore.isUsingMemory) {
      const product = memoryStore.products.find(
        p => p.sku.toLowerCase() === identifier.toLowerCase() || p._id === identifier
      );
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.json({ success: true, data: product });
    }

    let product = await Product.findOne({ sku: identifier.toUpperCase() });
    if (!product && identifier.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(identifier);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    if (memoryStore.isUsingMemory) {
      const newProduct = { ...req.body, _id: `mem_prod_${Date.now()}` };
      memoryStore.products.unshift(newProduct);
      return res.status(201).json({ success: true, data: newProduct });
    }

    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
