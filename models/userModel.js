const mongoose = require("mongoose");
const emailValidator=require('email-validator');
const bcrypt =require('bcrypt');

const db_link='mongodb+srv://admin:f4f3f8EjTTYeSRRb@cluster0.uaseea4.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log(db)
    console.log("DB Connected")
})
.catch(function(err){
    console.log(err)
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:6,
        validate:function(){
            return this.confirmPassword==this.password
        }
    },
})

//pre post hooks

//before save occurs in database
userSchema.pre('save',function(){
    console.log('before saving in db',this);
})

//after save occurs in database
userSchema.post('save',function(doc){
    console.log('after saving in db',doc);
})

userSchema.pre('save',function(){
    this.confirmPassword=undefined;
});

userSchema.pre('save', async function(){
    let salt =await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password,salt);
    // console.log(hashedString);
    this.password=hashedString
 })

//models
const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;




// (async function createUser(){
//     let user={
//         name:"Rishabh",
//         email:"riskha@gmail.com",
//         password:"rapchik",
//         confirmPassword:"rapchik"
//     };
//     let data =await userModel.create(user);
//     console.log(data);

// })();