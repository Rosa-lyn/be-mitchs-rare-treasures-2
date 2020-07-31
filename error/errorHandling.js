exports.handleInvalidEndpoint = (req, res, next) => {
  res.status(404).send({ msg: "invalid endpoint" });
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "42703") {
    res.status(400).send({ msg: "Invalid sort query" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Valid but non existent shop_id" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "Missing required properties" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  res.status(err.status).send({ msg: err.msg });
};
