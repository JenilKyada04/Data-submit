const express = require("express");
const { default: mongoose } = require("mongoose");
const mongooes = require('mongoose')
const path = require('path')
const bodyparser = require('body-parser')

const app = express()
app.use(bodyparser.urlencoded({extended : false}))

const port = 5000;


// Aanathi badhi file show thay jay (Public folder ni file)
app.use(express.static(path.join(__dirname , 'public')))  


app.get('/' , (req , res)=>{
        res.sendFile(__dirname + '/public/index.html')
})
console.log(__dirname + '/public/index.html')

// connect to mongodb
mongooes.connect('mongodb://localhost:27017', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("mongo is connected")
})

const Schema = mongoose.Schema;

const dataschema  = new Schema({
    name : String,
    email : String,
    subject : String,
})

const Data = mongoose.model('data' , dataschema)   // This is model is show in mongodb

app.post('/submit' , (req , res)=>{
    const {name , email , subject} = req.body;
    const newData = new Data({
        name , 
        email, 
        subject,
    })
    newData.save();

    res.redirect('/')
})

app.listen(port, ()=>{
    console.log(`Server is running at port ${5000}`)
})  