const express = require("express");
const notComingController = require("./../controllers/notComingController");

const router = express.Router();

router
  .route("/")
  .get(notComingController.getAllNotComingList)
  .delete(notComingController.deleteAllCoustomer);

router.route("/:id").delete(notComingController.deleteCoustomer);

module.exports = router;
