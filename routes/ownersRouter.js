const express = require("express");
const ownersRouter = express.Router();
const { getAllOwners } = require("../controllers/owners.controller");

ownersRouter.get("/", getAllOwners);

module.exports = ownersRouter;
