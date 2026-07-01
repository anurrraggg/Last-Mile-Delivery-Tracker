const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  rescheduleOrder,
  cancelOrder,
  estimateOrderPrice,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/estimate", estimateOrderPrice);
router.route("/").post(createOrder).get(getOrders);
router.route("/:id").get(getOrderById).delete(cancelOrder);
router.patch("/:id/status", updateOrderStatus);
router.patch("/:id/reschedule", rescheduleOrder);

module.exports = router;

