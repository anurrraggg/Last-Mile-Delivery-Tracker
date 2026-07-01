const DeliveryAgent = require("../models/DeliveryAgent");

/**
 * Automatically assigns an available agent in the pickup zone of the order.
 * Follows:
 * 1. Find agents where availability is true.
 * 2. Filter agents who are in the pickupZone.
 * 3. Find the nearest agent by calculating the distance between agent currentLocation and zone coordinates.
 * 4. Assign order and set agent availability to false.
 */
const autoAssignAgent = async (order, pickupZone) => {
  if (!pickupZone) return null;

  // 1 & 2. Find available agents in the pickup zone
  const availableAgents = await DeliveryAgent.find({
    availability: true,
    zone: pickupZone._id,
  }).populate("userId");

  if (availableAgents.length === 0) {
    return null;
  }

  // 3. Find the nearest agent
  let nearestAgent = null;
  let minDistance = Infinity;

  const zoneLat = pickupZone.coordinates?.lat || 0;
  const zoneLng = pickupZone.coordinates?.lng || 0;

  for (const agent of availableAgents) {
    const agentLat = agent.currentLocation?.lat || 0;
    const agentLng = agent.currentLocation?.lng || 0;

    // Euclidean distance calculation
    const distance = Math.sqrt(
      Math.pow(agentLat - zoneLat, 2) + Math.pow(agentLng - zoneLng, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestAgent = agent;
    }
  }

  if (nearestAgent) {
    // 4. Assign Order and Update Availability
    order.assignedAgent = nearestAgent._id;
    order.status = "Assigned";
    await order.save();

    nearestAgent.availability = false;
    await nearestAgent.save();

    return nearestAgent;
  }

  return null;
};

module.exports = {
  autoAssignAgent,
};
