process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../server");
const connection = require("../db/connection");

afterAll((done) => {
  return connection.destroy().then(() => {
    done();
  });
});
describe("app", () => {
  describe("/api", () => {
    describe("/treasures", () => {
      test("GET 200: responds with all the treasures in a JSON object", (done) => {
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
            done();
          });
      });
      test("GET 200: responds with the treasure sorted by default of cost_at_auction in ascending order", (done) => {
        return request(app)
          .get("/api/treasures")
          .expect(200)
          .then((res) => {
            expect(res.body.treasures).toBeSortedBy("cost_at_auction", {
              coerce: true,
            });
            expect(res.body.treasures[0].cost_at_auction).toBe("0.01");
            done();
          });
      });
      test("GET 404: responds a 404 error when given an invalid endpoint", (done) => {
        return request(app)
          .get("/api/treasureess")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("invalid endpoint");
            done();
          });
      });
      test("GET 200: responds with the treasure ordered by the specified column ", (done) => {
        return request(app)
          .get("/api/treasures?sort_by=age")
          .expect(200)
          .then((res) => {
            expect(res.body.treasures).toBeSortedBy("age");
            done();
          });
      });
      test("GET 200: responds with the treasure ordered in descending order", (done) => {
        return request(app)
          .get("/api/treasures?order=desc")
          .expect(200)
          .then((res) => {
            expect(res.body.treasures).toBeSortedBy("cost_at_auction", {
              descending: true,
              coerce: true,
            });
            done();
          });
      });
      test("GET 400: responds with an error when given a query with an incorrect column", (done) => {
        return request(app)
          .get("/api/treasures?sort_by=origin")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Invalid sort query");
            done();
          });
      });
      test("GET 200: responds with treasures of a certain colour when passed a colour query", (done) => {
        return request(app)
          .get("/api/treasures?colour=gold")
          .expect(200)
          .then((res) => {
            res.body.treasures.forEach((treasure) => {
              expect(treasure.colour).toBe("gold");
              done();
            });
          });
      });
      test("GET 200: defaults to return all treasures when passed a colour that is not in the db as a colour query", () => {
        return request(app)
          .get("/api/treasures?colour=invalid_colour")
          .expect(200)
          .then((res) => {
            expect(res.body.treasures.length).toBe(0);
          });
      });
    });
  });
});
