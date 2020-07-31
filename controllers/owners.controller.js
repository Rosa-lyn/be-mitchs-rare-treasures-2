const { fetchAllOwners } = require("../models/owners.model");

const getAllOwners = (req, res, next) => {
  const { sort_by } = req.query;

  fetchAllOwners(sort_by).then((allOwners) => {
    res.status(200).send({ owners: allOwners });
  });
};

module.exports = { getAllOwners };
