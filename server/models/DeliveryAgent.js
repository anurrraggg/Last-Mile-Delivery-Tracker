const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    currentLocation: {
      lat: {
        type: Number,
        required: true,
        default: 0,
      },
      lng: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    zone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      default: null,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    totalDeliveries: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1.0,
      max: 5.0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DeliveryAgent", deliveryAgentSchema);
