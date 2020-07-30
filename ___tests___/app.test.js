process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../server");
const connection = require("../db/connection");

describe("app", () => {
  afterAll(() => {
    connection.destroy();
  });
  describe("/api", () => {
    describe("/treasures", () => {
      test("GET 200: responds with all the treasures in a JSON object", () => {
        return request(app)
          .get("/api/treasures")
          .expect(200)
          .then((res) => {
            res.body.treasures.forEach((treasure) => {
              expect(treasure).toHaveProperty("treasure_id");
              expect(treasure).toHaveProperty("treasure_name");
              expect(treasure).toHaveProperty("colour");
              expect(treasure).toHaveProperty("age");
              expect(treasure).toHaveProperty("cost_at_auction");
              expect(treasure).toHaveProperty("shop_name");
            });
          });
      });
      test("GET 200: responds with the treasure sorted by default of cost_at_auction in ascending order", () => {
        return request(app)
          .get("/api/treasures")
          .expect(200)
          .then((res) => {
            expect(res.body.treasures).toBeSortedBy("cost_at_auction", {
              coerce: true,
            });
          });
      });
      test("GET 404: responds a 404 error when given an invalid endpoint", () => {
        return request(app)
          .get("/api/treasureess")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("invalid endpoint");
          });
      });
      test("GET 200: responds with the treasure ordered by the specified column ", () => {
        return request(app)
          .get("/api/treasures?sort_by=age")
          .expect(200)
          .then((res) => {
            expect(res.body.treasures).toBeSortedBy("age");
          });
      });
      test("GET 200: responds with the treasure ordered in descending order", () => {
        return request(app)
          .get("/api/treasures?order=desc")
          .expect(200)
          .then((res) => {
            expect(res.body.treasures).toBeSortedBy("cost_at_auction", {
              descending: true,
              coerce: true,
            });
          });
      });
      test("GET 404: responds with an error when given a query with an incorrect column", () => {
        return request(app)
          .get("/api/treasures?sort_by=origin")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Column does not exist");
          });
      });
    });
  });
});
