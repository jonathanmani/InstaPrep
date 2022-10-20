const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const mealPlanController = require("../Controller/mealPlan");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post(
  "/createMealPlan",
  upload.single("file"),
  mealPlanController.createMealPlan
);
router.post(
  "/addMealPlan",
  upload.single("file"),
  mealPlanController.addMealPlan
);
router.get("/:id", ensureAuth, mealPlanController.getMealPlan);

// router.delete("/deleteMealPlan/:id", mealPlanController.deletePost);

module.exports = router;
