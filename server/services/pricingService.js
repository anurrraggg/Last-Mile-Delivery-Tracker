const Zone = require("../models/Zone");
const RateCard = require("../models/RateCard");

/**
 * Extracts a pincode (6-digit Indian PIN code) from an address string.
 * Fallback to searching for city names if no pincode is found.
 */
const detectZoneFromAddress = async (address) => {
  if (!address) return null;

  // 1. Try to extract standard 6-digit pincode
  const pincodeMatch = address.match(/\b\d{6}\b/);
  let matchedZone = null;

  if (pincodeMatch) {
    const pincode = pincodeMatch[0];
    matchedZone = await Zone.findOne({ pincodes: pincode });
  }

  // 2. If no pincode matched, try case-insensitive city matching against zones
  if (!matchedZone) {
    const zones = await Zone.find({});
    for (const zone of zones) {
      const cityRegex = new RegExp(`\\b${zone.city}\\b`, "i");
      const nameRegex = new RegExp(`\\b${zone.zoneName}\\b`, "i");
      if (cityRegex.test(address) || nameRegex.test(address)) {
        matchedZone = zone;
        break;
      }
    }
  }

  return matchedZone;
};

/**
 * Calculates order pricing details
 */
const calculatePricing = async ({
  pickupAddress,
  dropAddress,
  length,
  breadth,
  height,
  actualWeight,
  orderType,
  paymentType,
}) => {
  // Volumetric weight: (L * B * H) / 5000
  const lVal = parseFloat(length) || 0;
  const bVal = parseFloat(breadth) || 0;
  const hVal = parseFloat(height) || 0;
  const actW = parseFloat(actualWeight) || 0;

  const volumetricWeight = (lVal * bVal * hVal) / 5000;

  // Billable weight is max of actual vs volumetric
  const billableWeight = Math.max(actW, volumetricWeight);

  // Identify pickup & drop zones
  const pickupZone = await detectZoneFromAddress(pickupAddress);
  if (!pickupZone) {
    throw new Error(
      "Could not detect service zone for pickup address. Please make sure the address contains a configured pincode or city name."
    );
  }

  const dropZone = await detectZoneFromAddress(dropAddress);
  if (!dropZone) {
    throw new Error(
      "Could not detect service zone for drop address. Please make sure the address contains a configured pincode or city name."
    );
  }

  // Lookup rate card
  const rateCard = await RateCard.findOne({
    pickupZone: pickupZone._id,
    dropZone: dropZone._id,
    orderType: orderType || "B2C",
  });

  if (!rateCard) {
    throw new Error(
      `No rate card configured for route: ${pickupZone.zoneName} (${pickupZone.city}) to ${dropZone.zoneName} (${dropZone.city}) for type ${orderType}`
    );
  }

  // Delivery charge = billable weight * pricePerKg
  let deliveryCharge = billableWeight * rateCard.pricePerKg;

  // COD surcharge
  if (paymentType === "COD") {
    deliveryCharge += rateCard.codCharge;
  }

  // Round off charge to two decimal places
  deliveryCharge = Math.round(deliveryCharge * 100) / 100;

  return {
    pickupZone,
    dropZone,
    volumetricWeight: Math.round(volumetricWeight * 100) / 100,
    billableWeight: Math.round(billableWeight * 100) / 100,
    deliveryCharge,
    rateCard,
  };
};

module.exports = {
  detectZoneFromAddress,
  calculatePricing,
};
