const express = require("express");
const router = express.Router();

const budgetController = require("../controllers/budget.controller");

router.post("/create",budgetController.addBuget)
router.put("/edit",budgetController.editBuget)

module.exports = router;