const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  adTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ["new", "used"],
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  operatingSystem: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: [
    {
      type: String,
      required: true,
    },
  ],
  region: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  showPhoneNumber: {
    type: Boolean,
    required: true,
  },
  adminApproved: {
    type: Boolean,
    default: false,
  },
  adminDisplay: {
    type: Boolean,
    default: true,
  },
  // Inspection fields
  wantsInspection: {
    type: Boolean,
    default: false,
  },

  assignedInspector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inspector", // Assuming you have an Inspector model
    default: null,
  },
  inspectorReview: {
    type: String,
    default: "None",
  },
  inspectionTime: {
    type: Date,
    default: null,
  },
  // User reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
