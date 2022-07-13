const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mealSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    composition:{
        type: String,
        required: true
    },
    hour:{
        type: String,
        required: true
    }
}, {timestamps:true})
module.exports = mongoose.model("Meal", mealSchema)