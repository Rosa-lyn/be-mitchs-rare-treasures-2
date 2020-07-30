const handleInvalidEndpoint = (req, res, next) => {
  res.status(404).send({ msg: "invalid endpoint" });
};

const handleInvalidQuery = (err, req, res, next) => {
  if (err.code === "42703") {
    res.status(400).send({ msg: "Invalid sort query" });
  } else console.log(err);
};

module.exports = { handleInvalidEndpoint, handleInvalidQuery };
