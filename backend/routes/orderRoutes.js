const express = require('express');
const router = express.Router();
const {
  getOrders,
  trackOrderByNumber,
  createOrder,
  updateOrderStatus,
} = require('../controllers/orderController');

router.route('/').get(getOrders).post(createOrder);
router.route('/track/:orderNumber').get(trackOrderByNumber);
router.route('/:id/status').put(updateOrderStatus);

module.exports = router;
