const knex = require("../db/connection");

const fetchAllTreasure = (sort_by = "cost_at_auction", order = "asc") => {
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
    .orderBy(sort_by, order);
};

module.exports = { fetchAllTreasure };
