const { fetchAllTreasure } = require("../models/treasure.model");

const getAllTreasures = (req, res, next) => {
  const { sort_by, order } = req.query;
  fetchAllTreasure(sort_by, order)
    .then((allTreasure) => {
      res.send({ treasures: allTreasure });
    })
    .catch(next);
};

module.exports = { getAllTreasures };
