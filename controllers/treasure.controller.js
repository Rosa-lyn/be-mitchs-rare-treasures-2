const {
  fetchAllTreasure,
  postNewTreasure,
  patchTreasureById,
  deleteTreasureById,
} = require("../models/treasure.model");

exports.getAllTreasures = (req, res, next) => {
  const { sort_by, order, colour } = req.query;
  fetchAllTreasure(sort_by, order, colour)
    .then((allTreasure) => {
      res.send({ treasures: allTreasure });
    })
    .catch(next);
};

exports.addNewTreasure = (req, res, next) => {
  const { body } = req;
  postNewTreasure(body)
    .then((addedTreasure) => {
      res.status(201).send({ treasure: addedTreasure });
    })
    .catch(next);
};

exports.updateTreasureById = (req, res, next) => {
  const { treasure_id } = req.params;
  const { cost_at_auction } = req.body;
  patchTreasureById(treasure_id, cost_at_auction)
    .then((updatedTreasure) => {
      res.send({ treasure: updatedTreasure });
    })
    .catch(next);
};

exports.removeTreasureById = (req, res, next) => {
  const { treasure_id } = req.params;
  deleteTreasureById(treasure_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
