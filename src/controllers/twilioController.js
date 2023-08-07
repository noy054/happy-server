const express = require("express");
const TestModel = require("./../models/TestModel");
const ArrivalsListModel = require("./../models/ArrivalsListModel");
const NotComingListModel = require("./../models/NotComingListModel");
const catchAsync = require("./../utils/catchAsync");
const io = require("./../../webSocket");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

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

let limitForTheFirestMessage;

exports.createNewArrival = catchAsync(async (req, res) => {
  // Extract relevant information from the request
  const phone = req.body.phone;

  const person = await TestModel.findOne({ phoneNumber: phone });
  const { name, id, phoneNumber } = person;
  if (person) {
    const newCustomerArrive = await ArrivalsListModel.create({
      name,
      id,
      phoneNumber,
    });

    const allNewCustomers = await ArrivalsListModel.find().select("-_id");
    io.getIO().emit("postNewArrivel", { data: allNewCustomers });

    res.status(200).json({
      status: "success",
      data: {
        customer: newCustomerArrive,
      },
    });
  } else {
    console.log("Person does not exist in the collection.");
  }
});

exports.createNotComing = catchAsync(async (req, res) => {
  const phone = req.body.phone;

  const person = await TestModel.findOne({ phoneNumber: phone });
  const { name, id, phoneNumber } = person;
  if (person) {
    const newCustomerArrive = await NotComingListModel.create({
      name,
      id,
      phoneNumber,
    });

    const allNewCustomers = await NotComingListModel.find().select("-_id");
    io.getIO().emit("postNotCommingCustomer", { data: allNewCustomers });

    limitForTheFirestMessage++;
    console.log("limitForTheFirestMessage", limitForTheFirestMessage);
    const customers = await findeLimitedCustomer(1, limitForTheFirestMessage);
    console.log("customers", customers);
    sendWhatsAppMessage(customers, contentVariables);
    res.status(200).json({
      status: "success",
      data: {
        customer: newCustomerArrive,
      },
    });
  } else {
    console.log("Person does not exist in the collection.");
  }
});

exports.sendWhatsAppMessage = catchAsync(async (req, res, next) => {
  const { holiday, date, startAt, finishAt, address, limit } = req.body;

  limitForTheFirestMessage = limit;
  console.log("limitForTheFirestMessage = limit", limitForTheFirestMessage);

  const customers = await findeLimitedCustomer(limit, 0);

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

const findeLimitedCustomer = (limit, skip) => {
  return TestModel.find({}, { phoneNumber: 1, name: 1 })
    .select("-_id")
    .limit(limit)
    .skip(skip);
};

const sendWhatsAppMessage = async (customers, contentVariables, limit) => {
  const messagesPromises = customers.slice(0, limit).map((item) => {
    return client.messages
      .create({
        from: process.env.TWILIO_SENDER_SID,
        contentSid: process.env.TWILIO_CONTECT_SID,
        contentVariables: JSON.stringify({
          1: item.name,
          ...contentVariables,
        }),
        to: `whatsapp:${item.phoneNumber}`,
      })
      .then((message) => {
        registerMessage(message, item.phoneNumber);
      });
  });

  return Promise.all(messagesPromises);
};

const registerMessage = async (message, phoneNumber) => {
  console.log("Create a Sync Map Item with the message");
  try {
    const mapItem = await client.sync
      .services(process.env.SYNC_SERVICE_SID)
      .syncMaps(process.env.SYNC_MAP_SID)
      .syncMapItems.create({
        key: `${phoneNumber}_${message.sid}`, // Use the phone number and message SID as the key
        data: {
          phoneNumber,
          contentVariables,
          contentSid: process.env.TWILIO_CONTECT_SID,
        },
      });

    console.log(`Map Item registered with SID ${mapItem.mapSid}`);
  } catch (err) {
    console.log("Error registering message:", err);
  }
};
