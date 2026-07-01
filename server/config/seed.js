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
      pincodes: ["208001", "208002", "208003", "208004", "208005", "208006", "208007", "208008", "208009", "208010", "208011", "208012", "208013", "208014", "208015", "208016", "208017", "208018", "208019", "208020", "208021", "208022", "208023", "208024", "208025", "208026", "208027"],
      coordinates: { lat: 26.4499, lng: 80.3319 },
    });

    const lucknow = await Zone.create({
      zoneName: "Lucknow North",
      city: "Lucknow",
      pincodes: ["226001", "226002", "226003", "226004", "226005", "226006", "226007", "226008", "226009", "226010", "226011", "226012", "226013", "226014", "226015", "226016", "226017", "226018", "226019", "226020", "226021", "226022", "226023", "226024", "226025", "226026"],
      coordinates: { lat: 26.8467, lng: 80.9462 },
    });

    const delhi = await Zone.create({
      zoneName: "Delhi NCR",
      city: "Delhi",
      pincodes: ["110001", "110002", "110003", "110004", "110005", "110006", "110007", "110008", "110009", "110010", "110011", "110012", "110013", "110014", "110015", "110016", "110017", "110018", "110019", "110020"],
      coordinates: { lat: 28.6139, lng: 77.2090 },
    });

    const mumbai = await Zone.create({
      zoneName: "Mumbai City",
      city: "Mumbai",
      pincodes: ["400001", "400002", "400003", "400004", "400005", "400006", "400007", "400008", "400009", "400010", "400011", "400012", "400013", "400014", "400015", "400016", "400017", "400018", "400019", "400020"],
      coordinates: { lat: 19.0760, lng: 72.8777 },
    });

    const bangalore = await Zone.create({
      zoneName: "Bangalore Urban",
      city: "Bangalore",
      pincodes: ["560001", "560002", "560003", "560004", "560005", "560006", "560007", "560008", "560009", "560010", "560011", "560012", "560013", "560014", "560015", "560016", "560017", "560018", "560019", "560020"],
      coordinates: { lat: 12.9716, lng: 77.5946 },
    });

    const hyderabad = await Zone.create({
      zoneName: "Hyderabad City",
      city: "Hyderabad",
      pincodes: ["500001", "500002", "500003", "500004", "500005", "500006", "500007", "500008", "500009", "500010", "500011", "500012", "500013", "500014", "500015", "500016", "500017", "500018", "500019", "500020"],
      coordinates: { lat: 17.3850, lng: 78.4867 },
    });

    const chennai = await Zone.create({
      zoneName: "Chennai City",
      city: "Chennai",
      pincodes: ["600001", "600002", "600003", "600004", "600005", "600006", "600007", "600008", "600009", "600010", "600011", "600012", "600013", "600014", "600015", "600016", "600017", "600018", "600019", "600020"],
      coordinates: { lat: 13.0827, lng: 80.2707 },
    });

    const pune = await Zone.create({
      zoneName: "Pune City",
      city: "Pune",
      pincodes: ["411001", "411002", "411003", "411004", "411005", "411006", "411007", "411008", "411009", "411010", "411011", "411012", "411013", "411014", "411015", "411016", "411017", "411018", "411019", "411020"],
      coordinates: { lat: 18.5204, lng: 73.8567 },
    });

    const ahmedabad = await Zone.create({
      zoneName: "Ahmedabad City",
      city: "Ahmedabad",
      pincodes: ["380001", "380002", "380003", "380004", "380005", "380006", "380007", "380008", "380009", "380010", "380011", "380012", "380013", "380014", "380015", "380016", "380017", "380018", "380019", "380020"],
      coordinates: { lat: 23.0225, lng: 72.5714 },
    });

    const kolkata = await Zone.create({
      zoneName: "Kolkata City",
      city: "Kolkata",
      pincodes: ["700001", "700002", "700003", "700004", "700005", "700006", "700007", "700008", "700009", "700010", "700011", "700012", "700013", "700014", "700015", "700016", "700017", "700018", "700019", "700020"],
      coordinates: { lat: 22.5726, lng: 88.3639 },
    });

    console.log("Zones seeded successfully. Seeding rate cards...");

    // 2. Create rate cards for all routes
    const zoneList = [kanpur, lucknow, delhi, mumbai, bangalore, hyderabad, chennai, pune, ahmedabad, kolkata];
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
