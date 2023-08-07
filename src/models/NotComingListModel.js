const mongoose = require("mongoose");

const NotComingListSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "A customer must have an id"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "A customer must have a name"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "A customer must have a phone number"],
    },
  },
  {
    versionKey: false,
  }
);

const NotComingList = mongoose.model("NotComingList", NotComingListSchema);

module.exports = NotComingList;
