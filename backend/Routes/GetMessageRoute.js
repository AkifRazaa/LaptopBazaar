const express = require("express");
const Message = require("../Modals/Message");

const router = express.Router();

// Define route to fetch messages between the current user and a selected chat partner
router.get("/messages/:loggedInUserId/:participantId", async (req, res) => {
  try {
    const { loggedInUserId, participantId } = req.params;

    // Fetch messages between the logged-in user and the selected chat partner
    const messages = await Message.find({
      $or: [
        { sender: loggedInUserId, receiver: participantId },
        { sender: participantId, receiver: loggedInUserId }
      ]
    }).sort({ timestamp: 1 }); // Sort messages by timestamp

    // Respond with the retrieved messages
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
