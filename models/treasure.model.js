const knex = require("../db/connection");

exports.fetchAllTreasure = (
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

exports.postNewTreasure = (treasure) => {
  return knex
    .insert(treasure)
    .into("treasures")
    .returning("*")
    .then((res) => {
      return res[0];
    });
};

exports.patchTreasureById = (treasure_id, cost_at_auction) => {
  if (cost_at_auction === undefined) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  } else
    return knex("treasures")
      .update("cost_at_auction", cost_at_auction)
      .where("treasure_id", treasure_id)
      .returning("*")
      .then((res) => {
        return res[0];
      });
};

exports.deleteTreasureById = (treasure_id) => {
  return knex("treasures").where("treasure_id", treasure_id).del();
};
