const Order = require("../models/Order");
const DeliveryAgent = require("../models/DeliveryAgent");
const TrackingHistory = require("../models/TrackingHistory");
const Notification = require("../models/Notification");
const pricingService = require("../services/pricingService");
const assignmentService = require("../services/assignmentService");
const notificationService = require("../services/notificationService");

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private (Customer/Admin)
const createOrder = async (req, res) => {
  try {
    const {
      pickupAddress,
      dropAddress,
      length,
      breadth,
      height,
      actualWeight,
      paymentType,
      orderType,
    } = req.body;

    // 1. Calculate pricing details
    const pricing = await pricingService.calculatePricing({
      pickupAddress,
      dropAddress,
      length,
      breadth,
      height,
      actualWeight,
      orderType,
      paymentType,
    });

    // 2. Create the order document
    const order = await Order.create({
      customer: req.user._id,
      pickupAddress,
      dropAddress,
      pickupZone: pricing.pickupZone._id,
      dropZone: pricing.dropZone._id,
      length: parseFloat(length),
      breadth: parseFloat(breadth),
      height: parseFloat(height),
      actualWeight: parseFloat(actualWeight),
      volumetricWeight: pricing.volumetricWeight,
      billableWeight: pricing.billableWeight,
      paymentType: paymentType || "Prepaid",
      orderType: orderType || "B2C",
      deliveryCharge: pricing.deliveryCharge,
      status: "Pending",
    });

    // Create initial TrackingHistory
    await TrackingHistory.create({
      orderId: order._id,
      status: "Pending",
      updatedBy: req.user._id,
      remarks: "Order created successfully. Awaiting assignment.",
    });

    // Create initial Customer Notification
    await notificationService.sendNotification({
      userId: req.user._id,
      orderId: order._id,
      message: `Your order #${order._id} has been placed successfully. Delivery charge: ₹${order.deliveryCharge}`,
    });

    // 3. Attempt Auto Agent Assignment
    const assignedAgent = await assignmentService.autoAssignAgent(
      order,
      pricing.pickupZone
    );

    if (assignedAgent) {
      // Add tracking history for assignment
      await TrackingHistory.create({
        orderId: order._id,
        status: "Assigned",
        updatedBy: req.user._id,
        remarks: `Automatically assigned agent: ${assignedAgent.userId.name}`,
      });

      // Notify customer of assignment
      await notificationService.sendNotification({
        userId: req.user._id,
        orderId: order._id,
        message: `Order #${order._id} has been assigned to agent ${assignedAgent.userId.name} (${assignedAgent.userId.phone}).`,
      });

      // Notify agent of new order
      await notificationService.sendNotification({
        userId: assignedAgent.userId._id,
        orderId: order._id,
        message: `You have been assigned a new delivery order #${order._id}. Pickup at ${order.pickupAddress}`,
      });
    }

    // Populate order zones and return
    const populatedOrder = await Order.findById(order._id)
      .populate("customer", "name email phone")
      .populate({
        path: "assignedAgent",
        populate: { path: "userId", select: "name phone" },
      })
      .populate("pickupZone")
      .populate("dropZone");

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "customer") {
      query.customer = req.user._id;
    } else if (req.user.role === "agent") {
      const agent = await DeliveryAgent.findOne({ userId: req.user._id });
      if (!agent) {
        return res.status(404).json({ message: "Agent profile not found" });
      }
      query.assignedAgent = agent._id;
    }
    // Admin gets all orders (no query filter)

    // Handle status query filters if passed from frontend
    if (req.query.status && req.query.status !== "All") {
      query.status = req.query.status;
    }

    const orders = await Order.find(query)
      .populate("customer", "name email phone")
      .populate({
        path: "assignedAgent",
        populate: { path: "userId", select: "name phone" },
      })
      .populate("pickupZone")
      .populate("dropZone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order details by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate({
        path: "assignedAgent",
        populate: { path: "userId", select: "name phone" },
      })
      .populate("pickupZone")
      .populate("dropZone");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Authorization checks
    if (
      req.user.role === "customer" &&
      order.customer._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized access to order" });
    }

    if (req.user.role === "agent") {
      const agent = await DeliveryAgent.findOne({ userId: req.user._id });
      if (
        !agent ||
        !order.assignedAgent ||
        order.assignedAgent._id.toString() !== agent._id.toString()
      ) {
        return res
          .status(403)
          .json({ message: "Unauthorized access to assigned order" });
      }
    }

    // Fetch tracking history
    const trackingHistory = await TrackingHistory.find({ orderId: order._id })
      .populate("updatedBy", "name role")
      .sort({ timestamp: -1 });

    // Fetch notifications
    const notifications = await Notification.find({
      orderId: order._id,
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      order,
      trackingHistory,
      notifications,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Private (Admin / Agent)
const updateOrderStatus = async (req, res) => {
  const { status, remarks } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const previousStatus = order.status;
    order.status = status;
    await order.save();

    // Create Tracking History
    await TrackingHistory.create({
      orderId: order._id,
      status,
      updatedBy: req.user._id,
      remarks: remarks || `Order status updated from ${previousStatus} to ${status}.`,
    });

    // Update agent availability if status completes
    if (order.assignedAgent) {
      const agent = await DeliveryAgent.findById(order.assignedAgent);
      if (agent) {
        if (status === "Delivered") {
          agent.availability = true;
          agent.totalDeliveries += 1;
          await agent.save();
        } else if (status === "Failed") {
          agent.availability = true;
          await agent.save();
        }
      }
    }

    // Notify Customer of status change
    await notificationService.sendNotification({
      userId: order.customer,
      orderId: order._id,
      message: `Your order #${order._id} status is now: ${status}. Remarks: ${remarks || "No remarks"}`,
    });

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Reschedule failed order
// @route   PATCH /api/orders/:id/reschedule
// @access  Private (Customer)
const rescheduleOrder = async (req, res) => {
  const { rescheduleDate } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Validate that order has failed status
    if (order.status !== "Failed") {
      return res
        .status(400)
        .json({ message: "Only failed orders can be rescheduled" });
    }

    // Set previous agent back to available
    if (order.assignedAgent) {
      const agent = await DeliveryAgent.findById(order.assignedAgent);
      if (agent) {
        agent.availability = true;
        await agent.save();
      }
    }

    // Reset order assignment status to pending for rescheduling
    order.status = "Pending";
    order.assignedAgent = null;
    order.rescheduleDate = new Date(rescheduleDate);
    await order.save();

    // Create Tracking History
    await TrackingHistory.create({
      orderId: order._id,
      status: "Pending",
      updatedBy: req.user._id,
      remarks: `Order rescheduled by customer for date: ${new Date(rescheduleDate).toLocaleDateString()}. Re-entering assignment pool.`,
    });

    // Notify customer
    await notificationService.sendNotification({
      userId: order.customer,
      orderId: order._id,
      message: `Your order #${order._id} has been rescheduled for ${new Date(rescheduleDate).toLocaleDateString()}. A new delivery agent will be assigned shortly.`,
    });

    // Trigger auto assignment again
    const pickupZone = await pricingService.detectZoneFromAddress(
      order.pickupAddress
    );
    if (pickupZone) {
      const assignedAgent = await assignmentService.autoAssignAgent(
        order,
        pickupZone
      );
      if (assignedAgent) {
        // Add tracking history for assignment
        await TrackingHistory.create({
          orderId: order._id,
          status: "Assigned",
          updatedBy: req.user._id,
          remarks: `Automatically assigned agent: ${assignedAgent.userId.name} for rescheduled shipment.`,
        });

        // Notify customer of assignment
        await notificationService.sendNotification({
          userId: order.customer,
          orderId: order._id,
          message: `Order #${order._id} has been reassigned to agent ${assignedAgent.userId.name} (${assignedAgent.userId.phone}).`,
        });

        // Notify agent
        await notificationService.sendNotification({
          userId: assignedAgent.userId._id,
          orderId: order._id,
          message: `You have been assigned a rescheduled order #${order._id}. Pickup at ${order.pickupAddress}`,
        });
      }
    }

    const updatedOrder = await Order.findById(order._id)
      .populate("customer", "name email phone")
      .populate({
        path: "assignedAgent",
        populate: { path: "userId", select: "name phone" },
      })
      .populate("pickupZone")
      .populate("dropZone");

    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Cancel order (delete or update to Cancelled)
// @route   DELETE /api/orders/:id
// @access  Private (Customer/Admin)
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Release agent if assigned
    if (order.assignedAgent) {
      const agent = await DeliveryAgent.findById(order.assignedAgent);
      if (agent) {
        agent.availability = true;
        await agent.save();
      }
    }

    // Delete tracking records
    await TrackingHistory.deleteMany({ orderId: order._id });
    // Delete notifications
    await Notification.deleteMany({ orderId: order._id });

    // Remove the order
    await Order.findByIdAndDelete(order._id);

    res.json({ message: "Order cancelled and deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Estimate order pricing
// @route   POST /api/orders/estimate
// @access  Private
const estimateOrderPrice = async (req, res) => {
  try {
    const {
      pickupAddress,
      dropAddress,
      length,
      breadth,
      height,
      actualWeight,
      orderType,
      paymentType,
    } = req.body;

    const pricing = await pricingService.calculatePricing({
      pickupAddress,
      dropAddress,
      length,
      breadth,
      height,
      actualWeight,
      orderType,
      paymentType,
    });

    res.json({
      volumetricWeight: pricing.volumetricWeight,
      billableWeight: pricing.billableWeight,
      pickupZone: pricing.pickupZone,
      dropZone: pricing.dropZone,
      deliveryCharge: pricing.deliveryCharge,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  rescheduleOrder,
  cancelOrder,
  estimateOrderPrice,
};

