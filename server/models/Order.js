const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    dropAddress: {
      type: String,
      required: true,
    },
    pickupZone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      default: null,
    },
    dropZone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      default: null,
    },
    length: {
      type: Number,
      required: true,
    },
    breadth: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    actualWeight: {
      type: Number,
      required: true,
    },
    volumetricWeight: {
      type: Number,
      required: true,
    },
    billableWeight: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["Prepaid", "COD"],
      required: true,
      default: "Prepaid",
    },
    orderType: {
      type: String,
      enum: ["B2B", "B2C"],
      required: true,
      default: "B2C",
    },
    deliveryCharge: {
      type: Number,
      required: true,
      default: 0,
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryAgent",
      default: null,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "Picked Up",
        "In Transit",
        "Out For Delivery",
        "Delivered",
        "Failed",
      ],
      default: "Pending",
    },
    rescheduleDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
