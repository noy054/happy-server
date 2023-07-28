const express = require("express");
const testController = require("./../controllers/testController");

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route("/")
  .get(testController.getAllTestList)
  .post(testController.createNewCustomerTest);
//   .patch(mainListController.updateCustomer);

router
  .route("/:id")
  // .get(tourController.getTour)
  // .patch(tourController.updateTour)
  .delete(testController.deleteCoustomer);

module.exports = router;
