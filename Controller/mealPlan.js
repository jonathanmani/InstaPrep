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
            const recipe = await Recipe.find();
            let mealPlanLunch = []
            let mealPlanDinner = []
            let lunches = recipe
                .filter(recipe => {
                    recipe.type.includes('Lunch')
                })
                .sort(()=>Math.random()-0.5)
            console.log('lunches',lunches)
            //let shuffledLunches = lunches.sort(()=>Math.random()-0.5)
            let dinners = recipe
                .filter(recipe => {
                    recipe.type.includes('Dinner')
                })
                .sort(()=>Math.random()-0.5)
            console.log('dinners',dinners)
            //let shuffledDinners = dinners.sort(()=>Math.random()-0.5)
            if (req.body.mealType.includes('Lunch') && req.body.mealType.includes('Dinner') ){
                for (let i = 0; i < req.body.daysCooking.length; i++){
                    mealPlanLunch.push(lunches[i])
                    mealPlanDinner.push(dinners[i])
                }
            } else if (req.body.mealType.includes('Lunch')){
                for (let i = 0; i < req.body.daysCooking.length; i++){
                    mealPlanLunch.push(lunches[i])
                }
            } else {
                for (let i = 0; i < req.body.daysCooking.length; i++){
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
                lunch: mealPlanLunch,
                dinner: mealPlanDinner
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
            let lunches = recipe.filter(recipe => {
                recipe.type.includes('Lunch')
            })
            let shuffledLunches = lunches.sort(()=>Math.random()-0.5)
            let dinners = recipe.filter(recipe => {
                recipe.type.includes('Dinner')
            })
            let shuffledDinners = dinners.sort(()=>Math.random()-0.5)
            
            const user = await User.findOne({ _id: req.user.id })
            console.log(user);
            res.render('mealPlan.ejs', { 
                mealPlan: mealPlan, 
                user: user, 
                lunches: shuffledLunches,
                dinners: shuffledDinners
            });
        } catch (err) {
            console.log(err)
        }
    }
}