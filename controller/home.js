const User = require('../models/User');
const Profile = require("../models/Profile");
const Recipe = require("../models/Recipe");
const MealPlan = require("../models/MealPlan");
const cloudinary = require('../middleware/cloudinary');

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    getProfile: async(req, res) => {
        try {
            const profile = await Profile.find({user: req.user.id})
            const recipe = await Recipe.find({user: req.user.id})
            const user = await User.findOne({ _id: req.user.id })
            console.log(user);
            res.render('profile.ejs', { recipes: recipe, user: user, profile:profile});
        } catch (err) {
            console.log(err)
        }
    },
    getFavorites: async(req, res) => {
        try {
            const recipe = await Recipe.find({ favorite:true })
            const user = await User.findOne({ _id: req.user.id })
            console.log("Got all the favorites", recipe);
            res.render('favorites.ejs', { favRecipes: recipe, user:user });
        } catch (error) {
            console.log(error)
        }
    },
    getMealPlan: async(req, res) => {
        try {
            const mealPlan = await MealPlan.find()
            res.render('mealPlans.ejs', {mealPlans: mealPlan})
        } catch (error) {
            console.log(error)
        }
    }

}