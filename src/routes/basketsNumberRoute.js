const express = require("express");
const BasketsNumberController = require("./../controllers/BasketsNumberController");

const router = express.Router();

router
  .route("/")
  .get(BasketsNumberController.getBasketsNumber)
  .patch(BasketsNumberController.updatedBasketsNumber);

module.exports = router;
