const express = require("express");
const router = express.Router();

const budgetController = require("../controllers/budgets.controller");

router.post("/create",budgetController.addBuget)

module.exports = router;