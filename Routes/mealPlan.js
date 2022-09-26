const express = require("express");
const router = express.Router();
const mealPlanController = require("../controllers/mealPlan");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

rrouter.get('/profile', ensureAuth, mealPlanController.getProfile);

router.get("/:id", ensureAuth, mealPlanController.getPost);

router.post("/createRecipe", upload.single("file"), mealPlanController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;