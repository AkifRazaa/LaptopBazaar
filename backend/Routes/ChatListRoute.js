const express = require("express");
const User = require("../Modals/User");
const Message = require("../Modals/Message");
const Inspector = require("../Modals/Inspector");

const router = express.Router();

// Define route to fetch chat list data for the logged-in user
router.get("/chat-list/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch messages where the logged-in user is the sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    // Extract unique chat participants' IDs
    const participantIds = new Set();
    messages.forEach((message) => {
      if (message.sender.toString() !== userId) {
        participantIds.add(message.sender);
      }
      if (message.receiver.toString() !== userId) {
        participantIds.add(message.receiver);
      }
    });

    // Convert participantIds Set to array
    const participantIdsArray = Array.from(participantIds);

    // Find users with IDs in participantIdsArray
    const users = await User.find({ _id: { $in: participantIdsArray } });

    // Find inspectors with IDs in participantIdsArray
    const inspectors = await Inspector.find({
      _id: { $in: participantIdsArray },
    });

    // Combine user names, IDs, and inspector names
    const chatList = [
        ...users.map((user) => ({ id: user._id, name: user.name })),
        ...inspectors.map((inspector) => ({ id: inspector._id, name: inspector.name })),
      ];

    // Respond with chat list data
    res.json(chatList);
  } catch (error) {
    console.error("Error fetching chat list data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
