
const mongoose = require('mongoose')
const Schema=mongoose.Schema

const facultySchema=new Schema({
    name:{
        type:String
    },
    subject:{
       
    },
    
})

const faculty=mongoose.model('faculty',facultySchema,"faculty-collection")