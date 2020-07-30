const knex = require("../db/connection");

const fetchAllTreasure = (
  sort_by = "cost_at_auction",
  order = "asc",
  colour
) => {
  // console.log(colour);
  return knex
    .join("shops", "shops.shop_id", "=", "treasures.shop_id")
    .select(
      "treasure_id",
      "treasure_name",
      "colour",
      "age",
      "cost_at_auction",
      "shop_name"
    )
    .from("treasures")
    .modify((query) => {
      if (colour) query.where("colour", colour);
    })
    .orderBy(sort_by, order);
};

const postNewTreasure = (treasure) => {
  return knex
    .insert(treasure)
    .into("treasures")
    .returning("*")
    .then((res) => {
      return res[0];
    });
};

const patchTreasureById = (treasure_id, cost_at_auction) => {
  return knex("treasures")
    .update("cost_at_auction", cost_at_auction)
    .where("treasure_id", treasure_id)
    .returning("*")
    .then((res) => {
      return res[0];
    });
};

module.exports = { fetchAllTreasure, postNewTreasure, patchTreasureById };
