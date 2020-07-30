const {
  fetchAllTreasure,
  postNewTreasure,
  patchTreasureById,
} = require("../models/treasure.model");

const getAllTreasures = (req, res, next) => {
  const { sort_by, order, colour } = req.query;
  fetchAllTreasure(sort_by, order, colour)
    .then((allTreasure) => {
      res.send({ treasures: allTreasure });
    })
    .catch(next);
};

const addNewTreasure = (req, res, next) => {
  const { body } = req;
  postNewTreasure(body)
    .then((addedTreasure) => {
      res.status(201).send({ treasure: addedTreasure });
    })
    .catch(next);
};

const updateTreasureById = (req, res, next) => {
  const { treasure_id } = req.params;
  const { cost_at_auction } = req.body;
  patchTreasureById(treasure_id, cost_at_auction).then((updatedTreasure) => {
    res.send({ treasure: updatedTreasure });
  });
};

module.exports = { getAllTreasures, addNewTreasure, updateTreasureById };
