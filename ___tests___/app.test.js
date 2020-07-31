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
      test("POST 201: responds with an object inserted into the shops table", () => {
        return request(app)
          .post("/api/treasures")
          .send({
            treasure_name: "necklace",
            colour: "purple",
            age: 3000,
            cost_at_auction: "345.23",
            shop_id: 3,
          })
          .expect(201)
          .then((res) => {
            expect(res.body.treasure.colour).toBe("purple");
            expect(res.body.treasure.shop_id).toBe(3);
          });
      });
      test("POST 404: responds with an error when given an valid but non existent shop_id", () => {
        return request(app)
          .post("/api/treasures")
          .send({
            treasure_name: "necklace",
            colour: "purple",
            age: 3000,
            cost_at_auction: "345.23",
            shop_id: 1223,
          })
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Valid but non existent shop_id");
          });
      });
      test("POST 400: responds with an error when passed a body with missing properties", () => {
        return request(app)
          .post("/api/treasures")
          .send({})
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Missing required properties");
          });
      });
      describe("/:treasure_id", () => {
        test("PATCH 200: updates the cost_at_auction price using the specific treasure Id and responds with updated treasure", () => {
          return request(app)
            .patch("/api/treasures/2")
            .send({ cost_at_auction: "200.02" })
            .expect(200)
            .then((res) => {
              expect(res.body.treasure.cost_at_auction).toBe("200.02");
              expect(res.body.treasure).toHaveProperty("colour");
              expect(res.body.treasure).toHaveProperty("age");
              expect(res.body.treasure).toHaveProperty("treasure_name");
              expect(res.body.treasure).toHaveProperty("shop_id");
            });
        });
        test("PATCH 400: incorrect column on request body", () => {
          return request(app)
            .patch("/api/treasures/2")
            .send({ cost: "402.56" })
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toBe("Bad request");
            });
        });
        test("PATCH 400: incorrect data type for column value on request body", () => {
          return request(app)
            .patch("/api/treasures/2")
            .send({ cost_at_auction: "not-a-price" })
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toBe("Bad request");
            });
        });
        test("DELETE 204: deletes treasure from the database by the given id", () => {
          return request(app)
            .delete("/api/treasures/5")
            .expect(204)
            .then(() => {
              return request(app)
                .get("/api/treasures")
                .then((res) => {
                  const found = res.body.treasures.some((treasure) => {
                    return treasure.treasure_id === 5;
                  });
                  expect(found).toBe(false);
                });
            });
        });
        test("DELETE 404: responds with an error when given an valid but non existent treasure_id ", () => {
          return request(app)
            .delete("/api/treasures/999")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toBe("Valid but non existent treasure_id");
            });
        });
      });
    });
    describe("/owners", () => {
      test("GET 200: responds with all the owners", () => {
        return request(app)
          .get("/api/owners")
          .expect(200)
          .then((res) => {
            res.body.owners.forEach((owner) => {
              expect(owner).toEqual(
                expect.objectContaining({
                  owner_id: expect.any(Number),
                  forename: expect.any(String),
                  surname: expect.any(String),
                  age: expect.any(Number),
                })
              );
            });
          });
      });
      test("GET 200: responds with all the owners in ascending order sorted by owner Id and limited to 10", () => {
        return request(app)
          .get("/api/owners")
          .expect(200)
          .then((res) => {
            expect(res.body.owners).toBeSortedBy("owner_id");
            expect(res.body.owners.length).toBe(10);
            expect(res.body.owners[0].owner_id).toBe(1);
          });
      });
      test("GET 200: responds with all the owners sorted by the specified column", () => {
        return request(app)
          .get("/api/owners?sort_by=forename")
          .expect(200)
          .then((res) => {
            // console.log(res.body);
            expect(res.body.owners).toBeSortedBy("forename");
            expect(res.body.owners[0].forename).toBe("firstname-a");
          });
      });
      test("Get 200: defaults back to owner Id when given an invalid sort by query", () => {
        return request(app)
          .get("/api/owners?sort_by=firstname")
          .expect(200)
          .then((res) => {
            expect(res.body.owners).toBeSortedBy("owner_id");
            expect(res.body.owners[0].owner_id).toBe(1);
          });
      });
      test("GET 200: accepts a max_age query and returns all owners below the specified age", () => {
        return request(app)
          .get("/api/owners?max_age=50")
          .expect(200)
          .then((res) => {
            res.body.owners.forEach((owner) => {
              expect(owner.age).toBeLessThanOrEqual(50);
            });
          });
      });
      test("GET 400: responds with error message and status 400 when given an invalid data type as a query value", () => {
        return request(app)
          .get("/api/owners?max_age=fifty")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad request");
          });
      });
      test("GET 200: accepts a min_age query and returns all owners above the specified age", () => {
        return request(app)
          .get("/api/owners?min_age=30")
          .expect(200)
          .then((res) => {
            res.body.owners.forEach((owner) => {
              expect(owner.age).toBeGreaterThanOrEqual(30);
            });
          });
      });
      test("GET 200: accepts an exact_age query and returns all owners of the specified age", () => {
        return request(app)
          .get("/api/owners?exact_age=23")
          .expect(200)
          .then((res) => {
            res.body.owners.forEach((owner) => {
              expect(owner.age).toBe(23);
            });
          });
      });
      test("GET 200: accepts a forename query and returns all owners with the specified forename", () => {
        return request(app)
          .get("/api/owners?forename=firstname-g")
          .expect(200)
          .then((res) => {
            res.body.owners.forEach((owner) => {
              expect(owner.forename).toBe("firstname-g");
            });
          });
      });
      test("GET 200: accepts a surname query and returns all owners with the specified surname", () => {
        return request(app)
          .get("/api/owners?surname=lastname-j")
          .expect(200)
          .then((res) => {
            res.body.owners.forEach((owner) => {
              expect(owner.surname).toBe("lastname-j");
            });
          });
      });
    });
  });
});
