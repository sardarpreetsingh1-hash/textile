const Order = require('../models/Order');
const { memoryStore } = require('../config/db');

// @desc    Get all orders
// @route   GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    if (memoryStore.isUsingMemory) {
      return res.json({ success: true, count: memoryStore.orders.length, data: memoryStore.orders });
    }
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single order / tracking information by Order Number
// @route   GET /api/orders/track/:orderNumber
exports.trackOrderByNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const cleanNum = orderNumber.trim().toUpperCase();

    if (memoryStore.isUsingMemory) {
      const order = memoryStore.orders.find(o => o.orderNumber.toUpperCase() === cleanNum);
      if (!order) {
        return res.status(404).json({ success: false, message: `Order #${cleanNum} not found in tracking registry` });
      }
      return res.json({ success: true, data: order });
    }

    const order = await Order.findOne({ orderNumber: cleanNum });
    if (!order) {
      return res.status(404).json({ success: false, message: `Order #${cleanNum} not found in tracking registry` });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    if (!orderData.orderNumber) {
      orderData.orderNumber = `TX-${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    }

    if (memoryStore.isUsingMemory) {
      const newOrder = {
        ...orderData,
        _id: `mem_ord_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryStore.orders.unshift(newOrder);
      return res.status(201).json({ success: true, data: newOrder });
    }

    const order = await Order.create(orderData);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update order status / stage
// @route   PUT /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, currentStageIndex } = req.body;

    if (memoryStore.isUsingMemory) {
      const order = memoryStore.orders.find(o => o._id === id || o.orderNumber === id);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      if (status) order.status = status;
      if (currentStageIndex !== undefined) order.currentStageIndex = currentStageIndex;
      return res.json({ success: true, data: order });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { $set: { status, currentStageIndex } },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
