const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {
  handleInvalidEndpoint,
  handleInvalidQuery,
} = require("./error/errorHandling");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", handleInvalidEndpoint);

app.use(handleInvalidQuery);

module.exports = app;
