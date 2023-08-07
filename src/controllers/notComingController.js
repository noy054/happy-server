const NotComingListModel = require("../models/NotComingListModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllNotComingList = catchAsync(async (req, res, next) => {
  const customer = await NotComingListModel.find().select("-_id -__v");

  console.log(customer);
  res.status(200).json({
    status: "success",
    results: customer.length,
    data: {
      customer,
    },
  });
});

exports.deleteCoustomer = catchAsync(async (req, res, next) => {
  const coustomer = await NotComingListModel.findOneAndRemove({
    id: req.params.id,
  });

  if (!coustomer) {
    return next(new AppError("No customer found with that ID", 404));
  }

  const updatedCustomers = await NotComingListModel.find().select("-_id -__v");
  console.log(updatedCustomers);
  res.status(200).json({
    status: "success",
    data: {
      customer: updatedCustomers,
    },
  });
});

exports.deleteAllCoustomer = catchAsync(async (req, res, next) => {
  await NotComingListModel.deleteMany();

  res.status(201).json({
    status: "success",
  });
});
