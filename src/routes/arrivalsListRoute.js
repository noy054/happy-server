const express = require("express");
const arrivalsController = require("./../controllers/arrivalsController");

const router = express.Router();

router
  .route("/")
  .get(arrivalsController.getAllArrivalsList)
  .post(arrivalsController.createNewCustomerArrive);

router.route("/:id").delete(arrivalsController.deleteCoustomer);

module.exports = router;
