const Zone = require("../models/Zone");
const RateCard = require("../models/RateCard");
const Order = require("../models/Order");
const DeliveryAgent = require("../models/DeliveryAgent");
const User = require("../models/User");
const TrackingHistory = require("../models/TrackingHistory");
const notificationService = require("../services/notificationService");

// @desc    Create a delivery zone
// @route   POST /api/admin/zones
// @access  Private (Admin)
const createZone = async (req, res) => {
  const { zoneName, city, pincodes, coordinates } = req.body;

  try {
    const pincodesArray = Array.isArray(pincodes)
      ? pincodes
      : pincodes.split(",").map((p) => p.trim());

    const zone = await Zone.create({
      zoneName,
      city,
      pincodes: pincodesArray,
      coordinates: coordinates || { lat: 0, lng: 0 },
    });

    res.status(201).json(zone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all delivery zones
// @route   GET /api/admin/zones
// @access  Private (Admin)
const getZones = async (req, res) => {
  try {
    const zones = await Zone.find({});
    res.json(zones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a rate card
// @route   POST /api/admin/ratecards
// @access  Private (Admin)
const createRateCard = async (req, res) => {
  const { pickupZone, dropZone, orderType, pricePerKg, codCharge } = req.body;

  try {
    const rateCard = await RateCard.create({
      pickupZone,
      dropZone,
      orderType: orderType || "B2C",
      pricePerKg: parseFloat(pricePerKg),
      codCharge: parseFloat(codCharge || 0),
    });

    const populatedCard = await RateCard.findById(rateCard._id)
      .populate("pickupZone")
      .populate("dropZone");

    res.status(201).json(populatedCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all rate cards
// @route   GET /api/admin/ratecards
// @access  Private (Admin)
const getRateCards = async (req, res) => {
  try {
    const rateCards = await RateCard.find({})
      .populate("pickupZone")
      .populate("dropZone");
    res.json(rateCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Manually assign agent to an order
// @route   PATCH /api/admin/orders/:id/assign
// @access  Private (Admin)
const assignAgentManually = async (req, res) => {
  const { agentId } = req.body; // DeliveryAgent id

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const newAgent = await DeliveryAgent.findById(agentId).populate("userId");
    if (!newAgent) {
      return res.status(404).json({ message: "Selected delivery agent not found" });
    }

    // Release current agent if assigned
    if (order.assignedAgent) {
      const currentAgent = await DeliveryAgent.findById(order.assignedAgent);
      if (currentAgent) {
        currentAgent.availability = true;
        await currentAgent.save();
      }
    }

    // Set order assignment details
    order.assignedAgent = newAgent._id;
    order.status = "Assigned";
    await order.save();

    // Set new agent to unavailable
    newAgent.availability = false;
    await newAgent.save();

    // Create Tracking Entry
    await TrackingHistory.create({
      orderId: order._id,
      status: "Assigned",
      updatedBy: req.user._id,
      remarks: `Manually assigned to agent: ${newAgent.userId.name} by Administrator.`,
    });

    // Notify customer
    await notificationService.sendNotification({
      userId: order.customer,
      orderId: order._id,
      message: `Your order #${order._id} has been manually assigned to agent ${newAgent.userId.name} (${newAgent.userId.phone}).`,
    });

    // Notify agent
    await notificationService.sendNotification({
      userId: newAgent.userId._id,
      orderId: order._id,
      message: `You have been assigned order #${order._id} by Administrator. Pickup at: ${order.pickupAddress}`,
    });

    const populatedOrder = await Order.findById(order._id)
      .populate("customer", "name email phone")
      .populate({
        path: "assignedAgent",
        populate: { path: "userId", select: "name phone" },
      })
      .populate("pickupZone")
      .populate("dropZone");

    res.json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all customers
// @route   GET /api/admin/customers
// @access  Private (Admin)
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" }).select("-password");
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all delivery agents
// @route   GET /api/admin/agents
// @access  Private (Admin)
const getAgents = async (req, res) => {
  try {
    const agents = await DeliveryAgent.find({})
      .populate("userId", "name email phone role")
      .populate("zone");
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createZone,
  getZones,
  createRateCard,
  getRateCards,
  assignAgentManually,
  getCustomers,
  getAgents,
};
