const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipeController = require("../controller/recipe");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, recipeController.getRecipe);
router.post("/addRecipe", upload.single("file"), recipeController.addRecipe);
router.post("/createRecipe", upload.single("file"), recipeController.createRecipe);
router.put("/favoriteRecipe/:id", recipeController.favoriteRecipe);
router.delete("/deleteRecipe/:id", recipeController.deleteRecipe);
//router.get('/recipe', recipeController.getRecipe)




module.exports = router;