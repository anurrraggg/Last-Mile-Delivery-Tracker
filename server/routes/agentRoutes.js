const express = require("express");
const router = express.Router();
const {
  getAssignedOrders,
  updateAgentLocation,
  updateAgentDeliveryStatus,
} = require("../controllers/agentController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);
router.use(authorize("agent"));

router.get("/orders", getAssignedOrders);
router.patch("/location", updateAgentLocation);
router.patch("/orders/:id", updateAgentDeliveryStatus);

module.exports = router;
