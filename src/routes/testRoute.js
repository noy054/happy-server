const express = require("express");
const testController = require("./../controllers/testController");

const router = express.Router();

router
  .route("/")
  .get(testController.getAllTestList)
  .post(testController.createNewCustomerTest);

router.route("/:id").delete(testController.deleteCoustomer);

module.exports = router;
