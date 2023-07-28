const express = require("express");
const twilioController = require("./../controllers/twilioController");
const twilioControllerGetContext = require("./../../functions/get-context.protected");

const router = express.Router();

router.route("/").post(twilioController.sendWhatsAppMessage);
// .patch(twilioController.updateCustomer);

// router.route("/").post(twilioControllerGetContext.handler);

module.exports = router;
