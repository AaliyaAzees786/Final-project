const mongoose = require('mongoose')
const bookSchema = mongoose.Schema({
    id:Number,
    status:String,
    title:String,
    author:String,
    year:Number,
    genre:String,
    ISBN:Number,
    img:String,
    Description:String
})

const BookData=mongoose.model('book',bookSchema);
module.exports=BookData