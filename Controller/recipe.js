const User = require('../models/User');
const Profile = require("../models/Profile");
const Recipe = require("../models/Recipe");
const cloudinary = require('../middleware/cloudinary');

module.exports ={
    createRecipe: async(req,res) => {
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
    getRecipe: async(req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.id)
            res.render('recipe.ejs', {
                recipes : recipe
            })
        } catch (error) {
            console.log(error)
        }
    },
    // getPost: async(req, res) =>{
    //     try {
            
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },
}