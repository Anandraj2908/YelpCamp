const express = require('express');
const app =express();
const path = require('path');
const mongoose =require('mongoose');
const Campground = require('./models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true, 
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res) => {
    res.render('home');
})
app.get('/campgrounds',async (req,res) => {
    const campgrounds =await Campground.find({});
    res.render('campgrounds/index',{campgrounds});
})
app.get('/makecampground',async (req,res) => {
    const camp = new Campground({ title: 'My Backyard', description:'Cheap camping'});
    await camp.save();
    res.send(camp);
})

app.listen(2908,() => {
    console.log("LISTENING ON PORT 2908")
})