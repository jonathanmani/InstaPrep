const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
      },
      image: {
        type: String,
      },
      ingredients: {
        type: Array,
        require: true,
      },
      directions: {
        type: String,
        require: true,
      },
      cloudinaryId: {
        type: String,
        require: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model('Recipe', RecipeSchema)