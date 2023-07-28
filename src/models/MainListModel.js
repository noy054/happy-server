const mongoose = require("mongoose");

const mainListSchema = new mongoose.Schema({
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
});

const MainList = mongoose.model("MainList", mainListSchema);

module.exports = MainList;
