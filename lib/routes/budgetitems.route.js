const express = require("express");
const router = express.Router();

const budgetItemController = require("../controllers/budgetitems.controller");

router.post("/create",budgetItemController.addBugetItem)

module.exports = router;