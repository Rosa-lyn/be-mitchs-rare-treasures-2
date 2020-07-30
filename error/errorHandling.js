const handleInvalidEndpoint = (req, res, next) => {
  res.status(404).send({ msg: "invalid endpoint" });
};

const handleInvalidQuery = (err, req, res, next) => {
  if (err.code === "42703") {
    res.status(404).send({ msg: "Column does not exist" });
  } else console.log(err);
};

module.exports = { handleInvalidEndpoint, handleInvalidQuery };
