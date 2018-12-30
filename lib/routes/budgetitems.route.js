const express = require("express");
const router = express.Router();

const budgetItemController = require("../controllers/budgetitems.controller");

router.post("/create",budgetItemController.addBugetItem)
router.delete("/delete",budgetItemController.deleteBudgetItem)
router.put("/edit",budgetItemController.editBudgetItem);

module.exports = router;