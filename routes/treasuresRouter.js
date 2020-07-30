const express = require("express");

const treasuresRouter = express.Router();

const {
  getAllTreasures,
  addNewTreasure,
  updateTreasureById,
} = require("../controllers/treasure.controller");

treasuresRouter.route("/").get(getAllTreasures).post(addNewTreasure);
treasuresRouter.patch("/:treasure_id", updateTreasureById);

module.exports = treasuresRouter;
