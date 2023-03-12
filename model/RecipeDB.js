const mongoose = require("mongoose");

//connect to mongoose DB
mongoose.connect("mongodb+srv://ggopikashaji08:gopika08@cluster0.fdhfl62.mongodb.net/?retryWrites=true&w=majority");

//Create Schema
const Schema = mongoose.Schema;

var recipeSchema  = new Schema({
    r_image: String,
    r_name: String,
    r_duration: Number,
    r_noofserve: Number,
});

var RecipeInfo = mongoose.model("recipes", recipeSchema);

module.exports = RecipeInfo;