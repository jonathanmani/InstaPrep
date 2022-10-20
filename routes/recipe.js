const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipeController = require("../Controller/recipe");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, recipeController.getRecipe);
router.post("/addRecipe", upload.single("file"), recipeController.addRecipe);
router.post(
  "/createRecipe",
  upload.single("file"),
  recipeController.createRecipe
);
router.put("/favoriteRecipe/:id", recipeController.favoriteRecipe);
router.put("/unfavoriteRecipe/:id", recipeController.unfavoriteRecipe);
router.put("/editRecipe/:id", recipeController.editRecipe);
router.put("/updateRecipe/:id", recipeController.updateRecipe);
router.delete("/deleteRecipe/:id", recipeController.deleteRecipe);

module.exports = router;
