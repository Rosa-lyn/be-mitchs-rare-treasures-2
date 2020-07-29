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

module.exports = { createRefObj, formatShops };
