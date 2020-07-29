const data = require("../data/index");

exports.seed = (knex) => {
  return knex
    .insert(data.ownerData)
    .into("owners")
    .returning("*")
    .then((insertedOwners) => {
      return knex
        .insert(insertedOwners)
        .into("shops")
        .returning("*")
        .then((insertedShops) => {
          console.log(insertedShops);
        });
      //   console.log(insertedOwners, "<- inserted owners");
    });
};

// module.exports = seed;
