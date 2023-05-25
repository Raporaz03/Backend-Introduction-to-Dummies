const express = require("express");
const app = express();

const mongoose = require("mongoose");
//middleware function -> post, front->json
app.use(express.json());      //global middleware
app.listen(3000);

let users =[
{
    id:1,
    name:'raja'

},
{
    id:2,
    name:'rishabh'

},
{
    id:3,
    name:'prangel'

},
{
    id:4,
    name:'snek'

}
];

// /Creating mini app

const userRouter=express.Router();
const authRouter=express.Router();
// BASE ROUTER
app.use("/user",userRouter);
app.use("/auth",authRouter);

userRouter
.route('/')
.get(getUser)    //path specific middleware
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById)

authRouter
.route('/signup')
.get( middleware1,getSignUp,middleware2)
.post(postSignUp)


// app.get('/user',(req,res)=>{
//     console.log(req.query);
//     res.send(users);
// })

// /mounting

// app.get('/user',)
// app.post('/user',)
// app.patch('/user',)
// app.delete('/user',)

//params
// app.get('/user/:username',)


//mouting



function getUser(req,res){
        console.log(req.query);
        res.send(users);
        
    }

function postUser(req,res){
    console.log(req.body)
    users=req.body
    res.json({
        message :"data received successfully",
        user:req.body
    })
}    

function updateUser(req,res){
    console.log('req.body->',req.body  );

    //update data in user object
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key]
    }
    res.json(
{        message:"data updated successfully"
}    )
}

function deleteUser(req,res){
    users={}
    res.json({
        message:"data has been deleted"
    })
}

function getUserById(req,res){
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }
    res.json({
        message:"req receiced",
        data:obj
    });
}


function middleware1(req,res,next){
    console.log("Middleware1 Encountered")
    next();
}

function middleware2(req,res){
    console.log("Middleware2 Encountered")
    // next();
    console.log("Middleware 2 ended req/res cycle")
    res.sendFile('public/index.html',{root:__dirname});

}

function getSignUp(req,res,next){
    console.log("get signup called");
    next();
    // res.sendFile('public/index.html',{root:__dirname});
}

function postSignUp(req,res){
  let obj=req.body;
  console.log("backend",obj)
  res.json({
    message:"user Signed up",
    data:obj
  }); 
}

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
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:6
    },
})

//models

const userModel=mongoose.model('userModel',userSchema);

(async function createUser(){
    let user={
        name:"Rishabh",
        email:"riskha@gmail.com",
        password:"rapchik",
        confirmPassword:"rapchik"
    };
    let data =await userModel.create(user);
    console.log(data);

})();