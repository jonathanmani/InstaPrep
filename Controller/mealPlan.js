const User = require('../models/User');
const Profile = require("../models/Profile");
const Recipe = require("../models/Recipe");
const cloudinary = require('../middleware/cloudinary');

module.exports ={
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
    createRecipe: async(req,res) => {
        try {
          // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);

            await Recipe.create({
                name: req.body.name,
                image: result.secure_url,
                type: req.body.type,
                cloudinaryId: result.public_id,
                ingredients: req.body.ingredients,
                directions: req.body.directions,
                user: req.user.id,
            });
            console.log('Post has been added!');
            res.redirect('/profile');  
        } catch (error) {
            console.log(error)
        }
    }
    getPost: async(req, res) =>{
        try {
            
        } catch (err) {
            console.log(err)
        }
    },
}