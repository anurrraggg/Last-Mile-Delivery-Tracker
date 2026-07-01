const mongoose = require("mongoose");
require("dotenv").config();

const Zone = require("./models/Zone");
const RateCard = require("./models/RateCard");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/last-mile-delivery";

const run = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB.");

  // Update existing zones with more pincodes
  const updates = [
    {
      city: "Lucknow",
      pincodes: Array.from({ length: 30 }, (_, i) => String(226001 + i)),
    },
    {
      city: "Kanpur",
      pincodes: Array.from({ length: 27 }, (_, i) => String(208001 + i)),
    },
    {
      city: "Delhi",
      pincodes: [
        ...Array.from({ length: 96 }, (_, i) => String(110001 + i)),
        "201301","201302","201304","122001","122002","122003","122004","122005","122006","122007","122008","122009","122010","122011","122015","122016","122017","122018"
      ],
    },
  ];

  for (const u of updates) {
    const result = await Zone.findOneAndUpdate(
      { city: { $regex: u.city, $options: "i" } },
      { $set: { pincodes: u.pincodes } },
      { new: true }
    );
    if (result) {
      console.log(`Updated ${result.city} with ${result.pincodes.length} pincodes.`);
    } else {
      console.log(`Zone for ${u.city} not found, creating...`);
    }
  }

  // Add new cities if they don't exist
  const newCities = [
    {
      zoneName: "Mumbai",
      city: "Mumbai",
      pincodes: [...Array.from({ length: 100 }, (_, i) => String(400001 + i)), ...Array.from({ length: 100 }, (_, i) => String(400601 + i))],
      coordinates: { lat: 19.0760, lng: 72.8777 },
    },
    {
      zoneName: "Bangalore",
      city: "Bangalore",
      pincodes: Array.from({ length: 100 }, (_, i) => String(560001 + i)),
      coordinates: { lat: 12.9716, lng: 77.5946 },
    },
    {
      zoneName: "Hyderabad",
      city: "Hyderabad",
      pincodes: Array.from({ length: 100 }, (_, i) => String(500001 + i)),
      coordinates: { lat: 17.3850, lng: 78.4867 },
    },
    {
      zoneName: "Chennai",
      city: "Chennai",
      pincodes: Array.from({ length: 100 }, (_, i) => String(600001 + i)),
      coordinates: { lat: 13.0827, lng: 80.2707 },
    },
    {
      zoneName: "Pune",
      city: "Pune",
      pincodes: Array.from({ length: 68 }, (_, i) => String(411001 + i)),
      coordinates: { lat: 18.5204, lng: 73.8567 },
    },
    {
      zoneName: "Kolkata",
      city: "Kolkata",
      pincodes: Array.from({ length: 150 }, (_, i) => String(700001 + i)),
      coordinates: { lat: 22.5726, lng: 88.3639 },
    },
    {
      zoneName: "Ahmedabad",
      city: "Ahmedabad",
      pincodes: Array.from({ length: 65 }, (_, i) => String(380001 + i)),
      coordinates: { lat: 23.0225, lng: 72.5714 },
    },
  ];

  for (const city of newCities) {
    const exists = await Zone.findOne({ city: { $regex: city.city, $options: "i" } });
    if (!exists) {
      const created = await Zone.create(city);
      console.log(`Created zone: ${created.zoneName}`);

      // Create rate cards for this new zone with all existing zones
      const allZones = await Zone.find({});
      for (const other of allZones) {
        const isIntra = other._id.toString() === created._id.toString();
        await RateCard.create({ pickupZone: created._id, dropZone: other._id, orderType: "B2C", pricePerKg: isIntra ? 15 : 25, codCharge: 30 });
        await RateCard.create({ pickupZone: created._id, dropZone: other._id, orderType: "B2B", pricePerKg: isIntra ? 10 : 20, codCharge: 0 });
        if (other._id.toString() !== created._id.toString()) {
          await RateCard.create({ pickupZone: other._id, dropZone: created._id, orderType: "B2C", pricePerKg: 25, codCharge: 30 });
          await RateCard.create({ pickupZone: other._id, dropZone: created._id, orderType: "B2B", pricePerKg: 20, codCharge: 0 });
        }
      }
      console.log(`Rate cards created for ${city.city}.`);
    } else {
      console.log(`${city.city} already exists, skipping.`);
    }
  }

  console.log("\nDone! Database updated successfully.");
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
