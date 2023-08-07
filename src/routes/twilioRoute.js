const express = require("express");
const twilioController = require("./../controllers/twilioController");

const router = express.Router();

router.route("/").post(twilioController.sendWhatsAppMessage);
router.route("/incoming").post(twilioController.createNewArrival);
router.route("/notComing").post(twilioController.createNotComing);

module.exports = router;
