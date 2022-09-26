const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const mealPlanController = require("../controller/mealPlan");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// router.post("/createMealPlan", upload.single("file"), mealPlanController.createPost);

// router.delete("/deleteMealPlan/:id", mealPlanController.deletePost);

module.exports = router;