const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {
  handleInvalidEndpoint,
  handlePSQLErrors,
} = require("./error/errorHandling");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", handleInvalidEndpoint);

app.use(handlePSQLErrors);

module.exports = app;
