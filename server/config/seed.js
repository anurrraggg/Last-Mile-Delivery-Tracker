const Zone = require("../models/Zone");
const RateCard = require("../models/RateCard");

const seedDatabase = async () => {
  try {
    const zoneCount = await Zone.countDocuments({});
    if (zoneCount > 0) {
      console.log("Database already has zones. Skipping automatic seeding.");
      return;
    }

    console.log("Seeding default zones...");
    // 1. Create default zones
    const kanpur = await Zone.create({
      zoneName: "Kanpur Central",
      city: "Kanpur",
      pincodes: ["208001", "208002", "208016", "208025"],
      coordinates: { lat: 26.4499, lng: 80.3319 },
    });

    const lucknow = await Zone.create({
      zoneName: "Lucknow North",
      city: "Lucknow",
      pincodes: ["226001", "226002", "226010", "226024"],
      coordinates: { lat: 26.8467, lng: 80.9462 },
    });

    const delhi = await Zone.create({
      zoneName: "Delhi NCR",
      city: "Delhi",
      pincodes: ["110001", "110002", "110011", "110020"],
      coordinates: { lat: 28.6139, lng: 77.2090 },
    });

    console.log("Zones seeded successfully. Seeding rate cards...");

    // 2. Create rate cards for all routes
    const zoneList = [kanpur, lucknow, delhi];
    let rateCardCount = 0;

    for (const pickup of zoneList) {
      for (const drop of zoneList) {
        const isIntra = pickup._id.toString() === drop._id.toString();

        // Configure B2C Rate Card
        await RateCard.create({
          pickupZone: pickup._id,
          dropZone: drop._id,
          orderType: "B2C",
          pricePerKg: isIntra ? 15 : 25,
          codCharge: 30,
        });

        // Configure B2B Rate Card
        await RateCard.create({
          pickupZone: pickup._id,
          dropZone: drop._id,
          orderType: "B2B",
          pricePerKg: isIntra ? 10 : 20,
          codCharge: 0, // No COD surcharge for business orders
        });

        rateCardCount += 2;
      }
    }

    console.log(`Successfully seeded ${rateCardCount} rate cards! Database seeding completed successfully.`);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
  }
};

module.exports = seedDatabase;
