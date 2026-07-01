const DeliveryAgent = require("../models/DeliveryAgent");
const Order = require("../models/Order");
const TrackingHistory = require("../models/TrackingHistory");
const notificationService = require("../services/notificationService");

// @desc    Get assigned orders for the logged-in agent
// @route   GET /api/agent/orders
// @access  Private (Agent)
const getAssignedOrders = async (req, res) => {
  try {
    const agent = await DeliveryAgent.findOne({ userId: req.user._id });

    if (!agent) {
      return res.status(404).json({ message: "Agent profile not found" });
    }

    const orders = await Order.find({ assignedAgent: agent._id })
      .populate("customer", "name email phone")
      .populate("pickupZone")
      .populate("dropZone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update agent location coordinates
// @route   PATCH /api/agent/location
// @access  Private (Agent)
const updateAgentLocation = async (req, res) => {
  const { lat, lng, latitude, longitude } = req.body;
  const targetLat = lat !== undefined ? lat : latitude;
  const targetLng = lng !== undefined ? lng : longitude;

  if (targetLat === undefined || targetLng === undefined) {
    return res.status(400).json({ message: "Latitude and longitude coordinates are required" });
  }

  try {
    const agent = await DeliveryAgent.findOne({ userId: req.user._id });

    if (!agent) {
      return res.status(404).json({ message: "Agent profile not found" });
    }

    agent.currentLocation = {
      lat: parseFloat(targetLat),
      lng: parseFloat(targetLng),
    };

    await agent.save();

    res.json({
      message: "Location updated successfully",
      currentLocation: agent.currentLocation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Agent status updates
// @route   PATCH /api/agent/orders/:id
// @access  Private (Agent)
const updateAgentDeliveryStatus = async (req, res) => {
  const { status, remarks } = req.body;

  try {
    const agent = await DeliveryAgent.findOne({ userId: req.user._id });
    if (!agent) {
      return res.status(404).json({ message: "Agent profile not found" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Verify agent is assigned to this order
    if (order.assignedAgent.toString() !== agent._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access: Agent is not assigned to this shipment" });
    }

    const previousStatus = order.status;
    order.status = status;
    await order.save();

    // Create Tracking Record
    await TrackingHistory.create({
      orderId: order._id,
      status,
      updatedBy: req.user._id,
      remarks: remarks || `Status transitioned by agent from ${previousStatus} to ${status}.`,
    });

    // Handle completed delivery statuses
    if (status === "Delivered") {
      agent.availability = true;
      agent.totalDeliveries += 1;
      await agent.save();
    } else if (status === "Failed") {
      agent.availability = true;
      await agent.save();
    }

    // Notify customer
    await notificationService.sendNotification({
      userId: order.customer,
      orderId: order._id,
      message: `Your order #${order._id} has been updated to: ${status} by the delivery agent. Remarks: ${remarks || "None"}`,
    });

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAssignedOrders,
  updateAgentLocation,
  updateAgentDeliveryStatus,
};
