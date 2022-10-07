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
            await MealPlan.create({
                name: req.body.name,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                daysCooking: req.body.daysCooking,
                mealType: req.body.mealType,
                favorite: req.body.favorite
            });
            console.log('added Meal Plan')
            res.redirect(`/mealPlan/${req.params.id}`)

        } catch (error) {
            console.log(error)
        }
    },
    getMealPlan: async(req, res) => {
        try {
            const profile = await Profile.find({user: req.user.id})
            const mealPlan = await MealPlan.find({user: req.user.id})
            const user = await User.findOne({ _id: req.user.id })
            console.log(user);
            res.render('mealPlan.ejs', { mealPlan: mealPlan, user: user, profile:profile});
        } catch (err) {
            console.log(err)
        }
    },
    // addRecipe: async(req,res) => {
    //     try {
    //       //Upload image to cloudinary
    //         // const result = await cloudinary.uploader.upload(req.file.path);
    //         await Recipe.create({
    //             name: req.body.name,
    //             image: req.body.image,
    //             type: req.body.type,
    //             //cloudinaryId: result.public_id,
    //             ingredients: req.body.ingredients.split(/\r?\n|\r|\n/g)
    //             .map(elem => {
    //                 elem = elem.trim()
    //                 return elem[0].toUpperCase() + elem.slice(1)
    //             }),
    //             instructions: req.body.instructions.split(/\r?\n|\r|\n/g)
    //             .map(elem =>{
    //                 elem = elem.trim()
    //                 return elem[0].toUpperCase() + elem.slice(1)
    //             }),
    //             user: req.user.id,
    //         });
    //         console.log('Post has been added!');
    //         res.redirect('/profile');  
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },
}