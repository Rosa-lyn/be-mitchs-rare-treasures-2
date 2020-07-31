const knex = require("../db/connection");

const fetchAllOwners = (
  sort_by,
  max_age,
  min_age,
  exact_age,
  forename,
  surname
) => {
  console.log(exact_age);
  if (sort_by === "forename" || sort_by === "age") {
    sort_by = sort_by;
  } else sort_by = "owner_id";
  return knex
    .select("*")
    .from("owners")
    .modify((query) => {
      if (max_age) query.whereBetween("age", [16, max_age]);
      if (min_age) query.whereBetween("age", [min_age, 250]);
      if (exact_age) query.where("age", exact_age);
      if (forename) query.where("forename", forename);
      if (surname) query.where("surname", surname);
    })
    .orderBy(sort_by, "asc")
    .limit(10);
};

module.exports = { fetchAllOwners };
