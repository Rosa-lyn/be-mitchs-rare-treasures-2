const ENV = process.env.NODE_ENV || "development";

const dbConfig = {
  development: {
    client: "pg",
    connection: {
      database: "mitchs_rare_treasures",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  test: {
    client: "pg",
    connection: {
      database: "mitchs_rare_treasures_test",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};

module.exports = dbConfig[ENV];
