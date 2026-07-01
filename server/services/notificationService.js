const Notification = require("../models/Notification");
const User = require("../models/User");

/**
 * Creates an in-app notification and simulates sending Email & SMS.
 */
const sendNotification = async ({ userId, orderId, type, message }) => {
  try {
    // 1. Save notification in database
    const notification = await Notification.create({
      userId,
      orderId,
      type: type || "Status Update",
      message,
      isRead: false,
    });

    // Fetch user details for notification targets
    const user = await User.findById(userId);
    if (user) {
      console.log(`\n--- Notification Dispatch System ---`);
      console.log(`[Notification ID]: ${notification._id}`);
      console.log(`[Recipient]: ${user.name} (${user.email})`);
      console.log(`[Role]: ${user.role}`);
      
      // Simulate Email notification
      console.log(`[EMAIL DISPATCH]`);
      console.log(`  To: ${user.email}`);
      console.log(`  Subject: Delivery Updates for Order #${orderId}`);
      console.log(`  Body: ${message}`);

      // Simulate SMS notification
      if (user.phone) {
        console.log(`[SMS DISPATCH]`);
        console.log(`  To: ${user.phone}`);
        console.log(`  Message: ${message}`);
      }
      console.log(`------------------------------------\n`);
    }

    return notification;
  } catch (error) {
    console.error(`Notification dispatch error: ${error.message}`);
  }
};

module.exports = {
  sendNotification,
};
