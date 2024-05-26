const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
require("./helpers/init_mongodb");
const { verifyAccessToken } = require("./helpers/jwt_helper");

const AuthRoute = require("./Routes/Auth.route");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", verifyAccessToken, async (request, response, next) => {
  response.send("Hello From Server");
});

app.use("/auth", AuthRoute);

app.use(async (request, response, next) => {
  next(createError.NotFound());
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
