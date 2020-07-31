const express = require("express");
const treasuresRouter = require("./treasuresRouter");
const ownersRouter = require("./ownersRouter");
const apiRouter = express.Router();

apiRouter.use("/treasures", treasuresRouter);

apiRouter.use("/owners", ownersRouter);

module.exports = apiRouter;
