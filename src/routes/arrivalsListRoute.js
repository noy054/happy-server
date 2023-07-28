const express = require("express");
const arrivalsController = require("./../controllers/arrivalsController");

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route("/")
  .get(arrivalsController.getAllArrivalsList)
  .post(arrivalsController.createNewCustomerArrive);
//   .patch(mainListController.updateCustomer);

router
  .route("/:id")
  // .get(tourController.getTour)
  // .patch(tourController.updateTour)
  .delete(arrivalsController.deleteCoustomer);

module.exports = router;
