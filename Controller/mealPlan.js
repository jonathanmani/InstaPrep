const User = require('../models/User');
const Profile = require("../models/Profile");
const Recipe = require("../models/Recipe");
const MealPlan = require("../models/MealPlan");
const cloudinary = require('../middleware/cloudinary');

module.exports ={
    createMealPlan: async(req, res) => {
        try {
            res.render('createMealPlan.ejs')
        } catch (error) {
            console.log(error)
        }
    },
    addMealPlan: async(req, res) => {
        try {
            let recipe = await Recipe.find();
            let mealPlanLunch = []
            let mealPlanDinner = []
            let mealtype = req.body.mealType
            let lunches = recipe
                .filter(recipe => recipe.type.includes('Lunch'))
                .sort(()=>Math.random()-0.5)
            console.log('lunches',lunches)
            let dinners = recipe
                .filter(recipe => recipe.type.includes('Dinner'))
                .sort(()=>Math.random()-0.5)
            console.log('dinners',dinners)

            if (mealtype.includes('Lunch') && mealtype.includes('Dinner') ){
                for (let i = 0; i < (req.body.daysCooking).length; i++){
                    mealPlanLunch.push(lunches[i])
                    mealPlanDinner.push(dinners[i])
                }
            } else if (mealtype.includes('Lunch')){
                for (let i = 0; i < (req.body.daysCooking).length; i++){
                    mealPlanLunch.push(lunches[i])
                }
            } else if (mealtype.includes('Dinner')) {
                for (let i = 0; i < (req.body.daysCooking).length; i++){
                    mealPlanDinner.push(dinners[i])
                }
            }
            console.log('mealPlanLunches', mealPlanLunch, 'mealPlanDinner', mealPlanDinner)
            
            await MealPlan.create({
                name: req.body.name,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                daysCooking: req.body.daysCooking,
                mealType: req.body.mealType,
                favorite: req.body.favorite,
                user: req.user.id,
                lunches: mealPlanLunch,
                dinners: mealPlanDinner
            });
            console.log('added Meal Plan')
            res.redirect('/profile')

        } catch (error) {
            console.log(error)
        }
    },
    getMealPlan: async(req, res) => {
        try {
            const mealPlan = await MealPlan.findById(req.params.id)
            const recipe = await Recipe.find();
            
            const user = await User.findOne({ _id: req.user.id })
            console.log(user);
            res.render('mealPlan.ejs', { 
                mealPlan: mealPlan, 
                user: user
            });
        } catch (err) {
            console.log(err)
        }
    }
}