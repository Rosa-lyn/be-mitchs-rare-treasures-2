const data = require("../data/index");
const {
  createRefObj,
  formatShops,
  createTreasuresRef,
  formatTreasures,
} = require("../../utils/formatting-functions");

exports.seed = (knex) => {
  return knex
    .insert(data.ownerData)
    .into("owners")
    .returning("*")
    .then((insertedOwners) => {
      const ownersRef = createRefObj(insertedOwners);
      const formattedShops = formatShops(ownersRef, data.shopData);
      return knex.insert(formattedShops).into("shops").returning("*");
    })
    .then((insertedShops) => {
      const shopsRef = createTreasuresRef(insertedShops);
      const formattedTreasures = formatTreasures(shopsRef, data.treasureData);
      return knex.insert(formattedTreasures).into("treasures");
    });
};
