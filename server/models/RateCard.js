const mongoose = require("mongoose");

const rateCardSchema = new mongoose.Schema(
  {
    pickupZone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      required: true,
    },
    dropZone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      required: true,
    },
    orderType: {
      type: String,
      enum: ["B2B", "B2C"],
      required: true,
      default: "B2C",
    },
    pricePerKg: {
      type: Number,
      required: true,
      min: 0,
    },
    codCharge: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Unique combination index to prevent duplicate rates
rateCardSchema.index(
  { pickupZone: 1, dropZone: 1, orderType: 1 },
  { unique: true }
);

module.exports = mongoose.model("RateCard", rateCardSchema);
