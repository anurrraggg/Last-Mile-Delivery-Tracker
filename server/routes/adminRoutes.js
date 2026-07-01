const express = require("express");
const router = express.Router();
const {
  createZone,
  getZones,
  createRateCard,
  getRateCards,
  assignAgentManually,
  getCustomers,
  getAgents,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);
router.use(authorize("admin"));

router.route("/zones").get(getZones).post(createZone);
router.route("/ratecards").get(getRateCards).post(createRateCard);
router.patch("/orders/:id/assign", assignAgentManually);
router.get("/customers", getCustomers);
router.get("/agents", getAgents);

module.exports = router;
