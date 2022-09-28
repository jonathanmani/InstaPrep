const User = require('../models/User');
const Profile = require("../models/Profile");
const Recipe = require("../models/Recipe");
const cloudinary = require('../middleware/cloudinary');

module.exports ={
    addRecipe: async(req,res) => {
        try {
          // Upload image to cloudinary
            // const result = await cloudinary.uploader.upload(req.file.path);
            await Recipe.create({
                name: req.body.name,
                // image: result.secure_url,
                type: req.body.type,
                // cloudinaryId: result.public_id,
                ingredients: req.body.ingredients.split(',')
                .map(elem => {
                    elem = elem.trim()
                    return elem[0].toUpperCase() + elem.slice(1)
                }),
                instructions: req.body.instructions.split(',')
                .map(elem =>{
                    elem = elem.trim()
                    return elem[0].toUpperCase() + elem.slice(1)
                }),
                user: req.user.id,
            });
            console.log('Post has been added!');
            res.redirect('/profile');  
        } catch (error) {
            console.log(error)
        }
    },
    createRecipe: async(req, res) => {
        try {
            res.render('createRecipe.ejs')
        } catch (error) {
            console.log(error)
        }
    },
    getRecipe: async(req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.id)
            const user = await User.findOne({ _id: req.user.id })
            res.render('recipe.ejs', {
                recipes: recipe,
                user: user
            })
        } catch (error) {
            console.log(error)
        }
    },
    favoriteRecipe: async(req,res) => {
        try {
            await Recipe.findOneAndUpdate(
                {_id: req.params.id},
                {favorite : true},
                {new: true}
            )
            console.log("Recipe Favorited!")
            res.redirect(`/recipe/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }
    },
    unfavoriteRecipe: async(req,res) => {
        try {
            await Recipe.findOneAndUpdate(
                {_id: req.params.id},
                {favorite : false},
                {new: true}
            )
            console.log("Recipe Favorited!")
            res.redirect(`/recipe/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }
    },
    deleteRecipe: async(req, res) => {
        try {
            let recipe = await Recipe.findById({_id: req.params.id });
            await Recipe.remove({_id: req.params.id })
            console.log('Deleted Recipe')
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }
}