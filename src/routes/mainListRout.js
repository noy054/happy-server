const express = require("express");
const mainListController = require("./../controllers/mainListController");

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route("/")
  .get(mainListController.getAllCustomers)
  .post(mainListController.createCustomer)
  .patch(mainListController.updateCustomer);

// router
//   .route("/:id")
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);

module.exports = router;
