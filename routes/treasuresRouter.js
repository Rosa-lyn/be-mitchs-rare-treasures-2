const express = require("express");

const treasuresRouter = express.Router();

const { getAllTreasures } = require("../controllers/treasure.controller");

treasuresRouter.get("/", getAllTreasures);

module.exports = treasuresRouter;
