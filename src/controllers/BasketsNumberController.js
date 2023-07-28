const BasketsNumberModel = require("./../models/BasketsNumberModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getBasketsNumber = catchAsync(async (req, res, next) => {
  const basketsNumber = await BasketsNumberModel.find().select("-_id");

  res.status(200).json({
    status: "success",
    data: {
      basketsNumber,
    },
  });
});

exports.updatedBasketsNumber = catchAsync(async (req, res, next) => {
  const basketsNumber = await MainList.find();

  // Update the phone numbers for all customers
  const updatedBasketsNumber = await Promise.all(
    basketsNumber.map(async (customer) => {
      return MainList.findByIdAndUpdate(
        customer._id,
        { basketsNumber: updatedBasketsNumber },
        { new: true }
      );
    })
  );

  res.status(200).json({
    status: "success",
    data: {
      basketsNumber: updatedBasketsNumber,
    },
  });
});

// exports.deleteCoustomer = catchAsync(async (req, res, next) => {
//   const coustomer = await BasketsNumberModel.findOneAndRemove({
//     id: req.params.id,
//   });

//   if (!coustomer) {
//     return next(new AppError("No customer found with that ID", 404));
//   }

//   const updatedCustomers = await BasketsNumberModel.find().select("-_id -__v");
//   console.log(updatedCustomers);
//   res.status(200).json({
//     status: "success",
//     data: {
//       customer: updatedCustomers,
//     },
//   });
// });
