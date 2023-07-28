const express = require("express");
const TestModel = require("./../models/TestModel");
const catchAsync = require("./../utils/catchAsync");
// const Content = require("twilio/lib/rest/Content");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const handler = require("../../functions/get-context.protected");

client.serverless.v1
  .services("ZSed7ad9fe3598d69f5615e4aba1ed971b")
  .update({ uiEditable: true })
  .then((service) => console.log(service.friendlyName));

const contentVariables = {
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
};

// Function to send WhatsApp message
const sendWhatsAppMessage = async (customers, contentVariables, limit) => {
  const messagesPromises = customers.slice(0, limit).map((item) => {
    return client.messages
      .create({
        from: "MG52da09d866bed28dd22017df003ad9a4",
        contentSid: "HXd47f1233df00cb1fe569bcf1d7f02601",
        contentVariables: JSON.stringify({ 1: item.name, ...contentVariables }),
        to: `whatsapp:${item.phoneNumber}`,
        statusCallback: "https://tasty-bees-yell.loca.lt/webhook",
      })
      .then((message) => {
        registerMessage(message, item.phoneNumber);
      });
  });

  return Promise.all(messagesPromises);
};

exports.sendWhatsAppMessage = catchAsync(async (req, res, next) => {
  const { holiday, date, startAt, finishAt, address, limit } = req.body;

  const customers = await TestModel.find(
    {},
    { phoneNumber: 1, name: 1 }
  ).select("-_id");

  contentVariables[2] = holiday;
  contentVariables[3] = date;
  contentVariables[4] = startAt;
  contentVariables[5] = finishAt;
  contentVariables[6] = address;

  sendWhatsAppMessage(customers, contentVariables, limit)
    .then(() => {
      res
        .status(200)
        .json({ success: true, message: "WhatsApp message sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to send WhatsApp message" });
    });
});

const registerMessage = async (message, phoneNumber) => {
  console.log("Create a Sync Map Item with the message");
  try {
    const mapItem = await client.sync.v1
      .services("IS16b41630f993c2c3352660c818787459")
      .syncMaps("MPfaf5f41b16230fbaa11472968b2c5372")
      .syncMapItems.create({
        key: `${phoneNumber}_${message.sid}`, // Use the phone number and message SID as the key
        data: {
          phoneNumber,
          contentVariables,
          contentSid: "HXd47f1233df00cb1fe569bcf1d7f02601",
        },
      });

    console.log(`Map Item registered with SID ${mapItem.mapSid}`);
  } catch (err) {
    console.log("Error registering message:", err);
  }
};

const event = {
  OriginalRepliedMessageSid: "someSid",
  From: "somePhoneNumber",
  ButtonPayload: "yes",
};

exports.makeNewArrivalCustomer = async (context, event) => {
  try {
    const response = await exports.handler(context, event);

    const { twiml, phone } = response;

    // Access the phone number returned from the function
    console.log("Phone number:", phone);

    // Continue with other logic using the phone number and twiml
    // For example, you can send the TwiML response back to the Twilio API
    return twiml.toString();
  } catch (err) {
    console.error("Error processing event:", err);
    return err;
  }
};
