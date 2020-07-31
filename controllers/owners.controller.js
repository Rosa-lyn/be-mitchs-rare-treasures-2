const { fetchAllOwners } = require("../models/owners.model");

const getAllOwners = (req, res, next) => {
  const { sort_by, max_age, min_age, exact_age, forename, surname } = req.query;
  fetchAllOwners(sort_by, max_age, min_age, exact_age, forename, surname)
    .then((allOwners) => {
      res.status(200).send({ owners: allOwners });
    })
    .catch(next);
};

module.exports = { getAllOwners };
