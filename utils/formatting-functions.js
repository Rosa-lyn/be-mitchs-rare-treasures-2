const createRefObj = (ownersArr) => {
  const newObj = {};
  ownersArr.forEach((owner) => {
    newObj[owner.forename] = owner.owner_id;
  });
  return newObj;
};

const formatShops = (refObj, shopsArray) => {
  const newShopsArray = shopsArray.map((shop) => {
    const newShopObj = { ...shop };
    const name = newShopObj.owner;
    newShopObj.owner_id = refObj[name];
    delete newShopObj.owner;
    return newShopObj;
  });

  return newShopsArray;
};

const createTreasuresRef = (treasuresArr) => {
  const newObj = {};
  treasuresArr.forEach((treasure) => {
    newObj[treasure.shop_name] = treasure.shop_id;
  });
  return newObj;
};

const formatTreasures = (refObj, treasuresArray) => {
  const newTreasuresArray = treasuresArray.map((treasure) => {
    const newTreasureObj = { ...treasure };
    const name = newTreasureObj.shop;
    newTreasureObj.shop_id = refObj[name];
    delete newTreasureObj.shop;
    return newTreasureObj;
  });

  return newTreasuresArray;
};

module.exports = {
  createRefObj,
  formatShops,
  createTreasuresRef,
  formatTreasures,
};
