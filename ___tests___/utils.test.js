const { createRefObj, formatShops } = require("../utils/formatting-functions");

describe("createRefObj", () => {
  test("returns an object", () => {
    expect(createRefObj([])).toEqual({});
  });
  test("returns a reference object with one property when passed an array with 1 object", () => {
    const owner = [
      {
        owner_id: 1,
        forename: "Isai",
        surname: "Cruickshank",
        age: 17,
      },
    ];
    expect(createRefObj(owner)).toEqual({ Isai: 1 });
  });
  test("returns a reference object with multiple properties when passed an array with multiple objects", () => {
    const owners = [
      {
        owner_id: 1,
        forename: "Isai",
        surname: "Cruickshank",
        age: 17,
      },
      {
        owner_id: 2,
        forename: "Tressa",
        surname: "Kassulke",
        age: 112,
      },
      {
        owner_id: 3,
        forename: "Fleta",
        surname: "Kulas",
        age: 89,
      },
    ];
    expect(createRefObj(owners)).toEqual({ Isai: 1, Tressa: 2, Fleta: 3 });
  });
  test("does not mutate the original array", () => {
    const owners = [
      {
        owner_id: 1,
        forename: "Isai",
        surname: "Cruickshank",
        age: 17,
      },
      {
        owner_id: 2,
        forename: "Tressa",
        surname: "Kassulke",
        age: 112,
      },
      {
        owner_id: 3,
        forename: "Fleta",
        surname: "Kulas",
        age: 89,
      },
    ];
    createRefObj(owners);
    expect(owners).toEqual([
      {
        owner_id: 1,
        forename: "Isai",
        surname: "Cruickshank",
        age: 17,
      },
      {
        owner_id: 2,
        forename: "Tressa",
        surname: "Kassulke",
        age: 112,
      },
      {
        owner_id: 3,
        forename: "Fleta",
        surname: "Kulas",
        age: 89,
      },
    ]);
    expect(owners[0]).toEqual({
      owner_id: 1,
      forename: "Isai",
      surname: "Cruickshank",
      age: 17,
    });
  });
});

describe.only("formatShops", () => {
  test("returns a new empty array", () => {
    expect(Array.isArray(formatShops({}, []))).toBe(true);
    const newArr = [];
    expect(formatShops({}, newArr)).not.toBe([]);
  });
  test("return an array with 1 object containing the key/value pair of the reference object", () => {
    const refObj = { Ima: 1 };
    const shop = [
      {
        shop_name: "Stamm, Stracke and Marks",
        owner: "Ima",
        slogan: "Integrated client-server productivity",
      },
    ];
    expect(formatShops(refObj, shop)).toEqual([
      {
        shop_name: "Stamm, Stracke and Marks",
        slogan: "Integrated client-server productivity",
        owner_id: 1,
      },
    ]);
  });
  test("returns an array with multiple objects containing key/value pairs from the reference object", () => {
    const shops = [
      {
        shop_name: "Stamm, Stracke and Marks",
        owner: "Ima",
        slogan: "Integrated client-server productivity",
      },
      {
        shop_name: "Bergstrom LLC",
        owner: "Jarrett",
        slogan: "Self-enabling grid-enabled projection",
      },
      {
        shop_name: "Harris, Langosh and Hand",
        owner: "Rollin",
        slogan: "Public-key motivating complexity",
      },
    ];
    const refObj = { Ima: 1, Jarrett: 2, Rollin: 3 };
    const formatedObj = [
      {
        shop_name: "Stamm, Stracke and Marks",
        slogan: "Integrated client-server productivity",
        owner_id: 1,
      },
      {
        shop_name: "Bergstrom LLC",
        slogan: "Self-enabling grid-enabled projection",
        owner_id: 2,
      },
      {
        shop_name: "Harris, Langosh and Hand",
        slogan: "Public-key motivating complexity",
        owner_id: 3,
      },
    ];
    expect(formatShops(refObj, shops)).toEqual(formatedObj);
  });
  test("does not mutate original array", () => {
    const shops = [
      {
        shop_name: "Stamm, Stracke and Marks",
        owner: "Ima",
        slogan: "Integrated client-server productivity",
      },
      {
        shop_name: "Bergstrom LLC",
        owner: "Jarrett",
        slogan: "Self-enabling grid-enabled projection",
      },
      {
        shop_name: "Harris, Langosh and Hand",
        owner: "Rollin",
        slogan: "Public-key motivating complexity",
      },
    ];
    formatShops({}, shops);
    expect(shops).toEqual([
      {
        shop_name: "Stamm, Stracke and Marks",
        owner: "Ima",
        slogan: "Integrated client-server productivity",
      },
      {
        shop_name: "Bergstrom LLC",
        owner: "Jarrett",
        slogan: "Self-enabling grid-enabled projection",
      },
      {
        shop_name: "Harris, Langosh and Hand",
        owner: "Rollin",
        slogan: "Public-key motivating complexity",
      },
    ]);
    expect(shops[0]).toEqual({
      shop_name: "Stamm, Stracke and Marks",
      owner: "Ima",
      slogan: "Integrated client-server productivity",
    });
  });
});
