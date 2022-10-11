const User = require('../models/User');
const Profile = require("../models/Profile");
const Recipe = require("../models/Recipe");
const MealPlan = require("../models/MealPlan");
const cloudinary = require('../middleware/cloudinary');
const moment = require('moment');

module.exports ={
    createMealPlan: async(req, res) => {
        try {
            const date = new Date()
            let minDate = moment(date)
            let maxDate = moment(minDate).add(7,'days').format('YYYY-MM-DD')
            res.render('createMealPlan.ejs', {
                minDate: minDate,
                maxDate: maxDate
            })
        } catch (error) {
            console.log(error)
        }
    },
    addMealPlan: async(req, res) => {
        try {
            //Gathering and Randomizing all Lunches and Dinners in Database
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


            // Using moment to create a list of days from startDate to endDate
            function getDateArray(obj){
                var start = obj.startDate.clone();
                var end = obj.endDate.clone();
                var res = [];
                while(start.isBefore(end)){
                  var day = start.format('dddd');
                  if( obj[day] ){
                    res.push(start.toDate());
                  }
                  start.add(1, 'd');
                }
                return res;
            }
            const obj = {}
            let cookingDays = req.body.daysCooking

            for(const day in cookingDays){
                obj[cookingDays[day]] = true
            }
            obj.startDate = moment(req.body.startDate)
            obj.endDate = moment(req.body.endDate)
            
            let mealPlanDays = getDateArray(obj)
            let formattedMealPlanDays = mealPlanDays.map(m => moment(m).format('dddd MMMM Do'))

            
            //creating MealPlan
            await MealPlan.create({
                name: req.body.name,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                daysCooking: formattedMealPlanDays,
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
            const lunchEntries = Object.entries(mealPlan.lunches)            
            const dinnersEntries = Object.entries(mealPlan.dinners)            
            const user = await User.findOne({ _id: req.user.id })
            res.render('mealPlan.ejs', { 
                mealPlan: mealPlan,
                lunches: lunchEntries,
                dinners: dinnersEntries, 
                user: user
            });
        } catch (err) {
            console.log(err)
        }
    }
}