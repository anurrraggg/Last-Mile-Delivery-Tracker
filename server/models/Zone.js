const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema(
  {
    zoneName: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    pincodes: {
      type: [String],
      required: true,
      default: [],
    },
    coordinates: {
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
  },
  {
    timestamps: true,
  }
);

// Index pincodes for fast lookup
zoneSchema.index({ pincodes: 1 });

module.exports = mongoose.model("Zone", zoneSchema);
