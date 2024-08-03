const mongoose = require("mongoose");

const inspectionRequestSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InspectionRequest = mongoose.model(
  "InspectionRequest",
  inspectionRequestSchema
);

module.exports = InspectionRequest;
