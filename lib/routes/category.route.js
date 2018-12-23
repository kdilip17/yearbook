const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");

router.post("/create",categoryController.addCategory)
router.post("/list",categoryController.listCategory)
router.put("/:id/update",categoryController.editCategory)
router.get("/:id",categoryController.getCategory)
router.delete("/:id/delete",categoryController.deleteCategory);

module.exports = router;
