const knex = require("../db/connection");

const fetchAllOwners = (sort_by = "owner_id") => {
  if (sort_by !== "forename" || sort_by !== "age") {
    sort_by = "owner_id";
  }
  return knex.select("*").from("owners").orderBy(sort_by, "asc").limit(10);
};

module.exports = { fetchAllOwners };
