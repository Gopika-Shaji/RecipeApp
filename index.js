//Basic Server Structure

//1.Import express
const express = require("express");

//Import DB
const RecipeInfo = require("./model/RecipeDB");

//for cyclic hosting
const path = require('path');

//2.Initialize express
const app = new express();

//Parsing Body parameter in post
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//for cyclic hosting
app.use(express.static(path.join(__dirname,'/build')));

//CORS POLICY
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

//3.API Creation
app.get('/',(req,res) => {
    res.send("Congratulations! Server Up");
})

//Create an API for movie
app.post('/api/create', (req,res) => {
    let recipe = new RecipeInfo(req.body);
    recipe.save();
    res.send("Data Added");
})



//Read DB
app.get('/api/view', async(req, res) => {
    //try-catch helps to get error
    try{
        let result = await RecipeInfo.find();
        res.json(result);
    }
    catch(error){
    res.status(3009).send(error);
    }
})

//Update DB
app.post('/api/update', async (req, res) => {
    let result = await RecipeInfo.findByIdAndUpdate(req.body._id, req.body);
    res.send("Data Updated");
})

//Delete DB
app.post('/api/delete', async (req, res) => {
    let result = await RecipeInfo.findByIdAndDelete(req.body._id);
    res.send("Data Deleted");
})

//Search in DB
app.post('/api/search', async (req, res) => {
    let result = await RecipeInfo.find(req.body);
    res.json(result);
})

//for cyclic hosting
app.get('/*', function(req, res) { 
    res.sendFile(path.join(__dirname ,'/build/index.html')); 
});

//4.Setting port number
app.listen(3009, () => {
    console.log("Server is running in port 3009");
})