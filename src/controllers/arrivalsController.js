const ArrivalsListModel = require("./../models/ArrivalsListModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllArrivalsList = catchAsync(async (req, res, next) => {
  const customer = await ArrivalsListModel.find().select("-_id -__v");

  console.log(customer);
  res.status(200).json({
    status: "success",
    results: customer.length,
    data: {
      customer,
    },
  });
});

exports.createNewCustomerArrive = catchAsync(async (req, res, next) => {
  const newCustomerArrive = await ArrivalsListModel.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      customer: newCustomerArrive,
    },
  });
});

exports.deleteCoustomer = catchAsync(async (req, res, next) => {
  const coustomer = await ArrivalsListModel.findOneAndRemove({
    id: req.params.id,
  });

  if (!coustomer) {
    return next(new AppError("No customer found with that ID", 404));
  }

  const updatedCustomers = await ArrivalsListModel.find().select("-_id -__v");
  console.log(updatedCustomers);
  res.status(200).json({
    status: "success",
    data: {
      customer: updatedCustomers,
    },
  });
});
