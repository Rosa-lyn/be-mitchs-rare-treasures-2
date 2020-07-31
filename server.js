const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {
  handleInvalidEndpoint,
  handlePSQLErrors,
  handleCustomErrors,
} = require("./error/errorHandling");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", handleInvalidEndpoint);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);

module.exports = app;
