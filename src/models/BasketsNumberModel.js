const mongoose = require("mongoose");

const basketsNumberSchema = new mongoose.Schema({
  basketsNumber: {
    type: Number,
    default: 0,
    required: [true, "A customer must have a phone number"],
  },
});

const basketsNumber = mongoose.model("basketsNumber", basketsNumberSchema);

module.exports = basketsNumber;
