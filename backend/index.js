require("dotenv").config({ path: "./vars/.env" });

const express = require("express");
const app = express();

const MongoDB = require("./db");
const cors = require("cors");
const Message = require("./Modals/Message"); // Import the Message model
const User = require("./Modals/User"); // Import the User model
const Career = require("./Modals/Career");

const http = require("http");
const socketIO = require("socket.io");
const Inspector = require("./Modals/Inspector");

const cloudinary = require("cloudinary").v2;
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(cors());
app.use(
  express.json({
    limit: "20mb",
  })
);

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = process.env.PORT || 5000;

MongoDB();

app.use("/api", require("./Routes/SignupRoute"));
app.use("/api", require("./Routes/LoginRoute"));
app.use("/api", require("./Routes/AddPostRoute"));
app.use("/api", require("./Routes/GetApprovePostRoute"));
app.use("/api", require("./Routes/PostApprovePostRoute"));
app.use("/api", require("./Routes/AllPostRoute"));
app.use("/api", require("./Routes/DeletePostRoute"));
app.use("/api", require("./Routes/UserPostsRoute"));
app.use("/api", require("./Routes/AddInspectorRoute"));
app.use("/api", require("./Routes/UpdatePostRoute"));
app.use("/api", require("./Routes/ChatListRoute"));
app.use("/api", require("./Routes/GetMessageRoute"));
app.use("/api", require("./Routes/FilterPostRoute"));
app.use("/api", require("./Routes/CareerRoute"));
app.use("/api", require("./Routes/ForgotPassword"));
app.use("/api", require("./Routes/BookInspectionRoute"));


app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/get-inpectors", async (req, res) => {
  try {
    // Retrieve all applications from the database
    const inspector = await Inspector.find({});

    // Send the applications data to the frontend
    res.status(200).json(inspector);
  } catch (error) {
    console.error("Error retrieving inspector:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete inspector by ID
app.delete("/api/delete-inspector/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Inspector.findByIdAndDelete(id);
    res.status(200).json({ message: "Inspector deleted successfully" });
  } catch (error) {
    console.error("Error deleting inspector:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the inspector" });
  }
});

app.get("/api/applications", async (req, res) => {
  try {
    // Retrieve all applications from the database
    const applications = await Career.find();

    // Send the applications data to the frontend
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error retrieving applications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/upload-image", async (req, res) => {
  const imageUrl = req.body.imageUrl;

  // console.log(imageUrl);
  try {
    const cloudinaryRes = await cloudinary.uploader.upload(imageUrl, {
      folder: "/e-com",
      format: "png",
    });

    // console.log(cloudinaryRes.secure_url);

    res.status(200).json({ imageUrl: cloudinaryRes.secure_url });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

// Route to get logged-in user details
app.post("/api/user", async (req, res) => {
  try {
    const userId = req.body.userId;

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user details as a response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Define Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle private messages
  socket.on("private_message", async (data) => {
    try {
      // Check if the message contains image data
      if (data.imageUrl) {
        // If the message contains an image URL, create a new message object with the image URL
        const newMessage = new Message({
          sender: data.sender,
          receiver: data.recipient,
          imageUrl: data.imageUrl,
        });

        // Save the new Message document to the database
        await newMessage.save();

        // Emit the message to the recipient's room
        socket.to(data.room).emit("private_message", newMessage);

        console.log("Private message with image:", newMessage);
      } else {
        // If the message does not contain an image URL, create a new message object with text content
        const newMessage = new Message({
          sender: data.sender,
          receiver: data.recipient,
          content: data.content,
        });

        // Save the new Message document to the database
        await newMessage.save();

        // Emit the message to the recipient's room
        socket.to(data.room).emit("private_message", newMessage);

        console.log("Private message:", newMessage);
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle room joining
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
