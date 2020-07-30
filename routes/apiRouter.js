const express = require("express");
const treasuresRouter = require("./treasuresRouter");
const apiRouter = express.Router();

apiRouter.use("/treasures", treasuresRouter);

module.exports = apiRouter;
