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
        type: Array,
        require: true,
      },
      ingredients: {
        type: Array,
        require: true,
      },
      instructions: {
        type: Array,
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
      favorite: {
        type: Boolean,
        default:false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model('Recipe', RecipeSchema)