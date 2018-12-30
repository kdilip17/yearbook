const express = require("express");
const router = express.Router();

const budgetController = require("../controllers/budget.controller");

router.post("/create",budgetController.addBuget)
router.put("/edit",budgetController.editBuget)
router.get("/detail",budgetController.getBudget)
router.get("/list",budgetController.getBudgetList)
router.delete("/delete",budgetController.deleteBudget)

module.exports = router;