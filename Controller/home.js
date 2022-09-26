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
    }
}