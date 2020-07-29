const express = require("express");

const apiRouter = express.Router();

apiRouter.use("/treasures", treasuresRouter);

module.exports = apiRouter;
