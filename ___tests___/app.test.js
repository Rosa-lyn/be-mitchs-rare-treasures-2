process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../server");

describe("app", () => {
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
    });
  });
});
