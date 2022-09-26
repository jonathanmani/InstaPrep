const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
      },
      image: {
        type: String,
      },
      type: {
        type: String,
        require: true,
      },
      ingredients: {
        type: Array,
        require: true,
      },
      instructions: {
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
      favourite: {
        type: Boolean
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model('Recipe', RecipeSchema)