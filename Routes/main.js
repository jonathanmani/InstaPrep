const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const homeController = require("../controller/home");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, homeController.getProfile);
router.get("/favorites", homeController.getFavorites);
router.get("/allMealPlans", homeController.getMealPlan);
router.get("/login", authController.getLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/login", authController.postLogin);
router.post("/signup", authController.postSignup);

module.exports = router;
