const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipeController = require("../controller/recipe");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, recipeController.getRecipe);

router.post("/createRecipe", upload.single("file"), recipeController.createRecipe);

//router.put("/likeRecipe/:id", recipeController.likeRecipe);

//router.delete("/deleteRecipe/:id", recipeController.deleteRecipe);

module.exports = router;