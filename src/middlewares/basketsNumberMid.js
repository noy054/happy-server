const BasketsNumberModel = require("../models/BasketsNumberModel");

// Create a new document with the default value of 0 for basketsNumber
const newBasketsNumberDocument = new BasketsNumberModel();

// Save the document to the database
newBasketsNumberDocument.save((err, savedDocument) => {
  if (err) {
    console.error("Error saving the document:", err);
  } else {
    console.log("Document saved successfully:", savedDocument);
  }
});
