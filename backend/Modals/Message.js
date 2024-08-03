const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    // required: true,
  },
  imageUrl: {
    type: String,
  },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
