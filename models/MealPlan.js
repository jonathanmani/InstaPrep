const mongoose = require('mongoose')

const MealPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    startDate: {
        type: Date,
        require: true,
    },
    endDate: {
        type: Date,
        require: true,
    },
    daysCooking: {
        type: Array,
        require: true,
    },
    mealType: {
        type: Array,
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
    }
})

module.exports = mongoose.model('MealPlan', MealPlanSchema)