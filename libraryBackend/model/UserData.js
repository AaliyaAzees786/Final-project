const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    Role:String,
    Name:String,
    Place:String,
    Age:Number,
    EmailId: {type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
      },
    Education:String,
    PhoneNumber:Number,
    Username:{type: String,required: true, unique: true },
    Password:{ type: String, required: true },
    Cpass:{type: String,required: true }
})

const UserData=mongoose.model('user',userSchema);
module.exports=UserData