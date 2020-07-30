const { fetchAllTreasure } = require("../models/treasure.model");

const getAllTreasures = (req, res, next) => {
  const { sort_by, order, colour } = req.query;
  fetchAllTreasure(sort_by, order, colour)
    .then((allTreasure) => {
      res.send({ treasures: allTreasure });
    })
    .catch(next);
};

module.exports = { getAllTreasures };
