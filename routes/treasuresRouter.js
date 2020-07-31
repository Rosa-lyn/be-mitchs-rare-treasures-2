const express = require("express");

const treasuresRouter = express.Router();

const {
  getAllTreasures,
  addNewTreasure,
  updateTreasureById,
  removeTreasureById,
} = require("../controllers/treasure.controller");

treasuresRouter.route("/").get(getAllTreasures).post(addNewTreasure);

treasuresRouter
  .route("/:treasure_id")
  .patch(updateTreasureById)
  .delete(removeTreasureById);

module.exports = treasuresRouter;
