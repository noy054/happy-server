const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const globalErrorHandler = require("./src/controllers/errorController");

const AppError = require("./src/utils/appError");
const ArrivalsListModel = require("./src/models/ArrivalsListModel");
const TestModel = require("./src/models/TestModel");

const mainListRouter = require("./src/routes/mainListRout");
const arrivalsListRouter = require("./src/routes/arrivalsListRoute");
const notComingRouter = require("./src/routes/notComingRoute");
const twilioRouter = require("./src/routes/twilioRoute");
const testRoute = require("./src/routes/testRoute");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

app.use(express.static(`${__dirname}/public`));

const allowedOrigins = ["http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use("/main", mainListRouter);
app.use("/arrivals", arrivalsListRouter);
app.use("/sendMessage", twilioRouter);
app.use("/notComming", notComingRouter);
app.use("/test", testRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
