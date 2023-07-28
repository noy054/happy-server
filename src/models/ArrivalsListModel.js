const mongoose = require("mongoose");

const arrivalsListSchema = new mongoose.Schema(
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
    basketsNumber: {
      type: Number,
      default: 1,
    },
    isArrived: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const ArrivalsList = mongoose.model("ArrivalsList", arrivalsListSchema);

module.exports = ArrivalsList;
