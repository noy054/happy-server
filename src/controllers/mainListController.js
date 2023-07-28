const MainList = require("./../models/MainListModel");
// const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllCustomers = catchAsync(async (req, res, next) => {
  const customer = await MainList.find().select("-_id");

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: customer.length,
    data: {
      customer,
    },
  });
});

exports.createCustomer = catchAsync(async (req, res, next) => {
  const newCustomer = await MainList.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      customer: newCustomer,
    },
  });
});

exports.updateCustomer = catchAsync(async (req, res, next) => {
  const customers = await MainList.find();

  // Update the phone numbers for all customers
  const updatedCustomers = await Promise.all(
    customers.map(async (customer) => {
      const updatedPhoneNumber = `+972${customer.phoneNumber}`;
      return MainList.findByIdAndUpdate(
        customer._id,
        { phoneNumber: updatedPhoneNumber },
        { new: true }
      );
    })
  );

  res.status(200).json({
    status: "success",
    data: {
      customers: updatedCustomers,
    },
  });
});
