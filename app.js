const express = require("express");
const app = express();
const userModel = require('./models/userModel')

//middleware function -> post, front->json
app.use(express.json());      //global middleware
app.listen(3000);

// let users =[
// {
//     id:1,
//     name:'raja'

// },
// {
//     id:2,
//     name:'rishabh'

// },
// {
//     id:3,
//     name:'prangel'

// },
// {
//     id:4,
//     name:'snek'

// }
// ];

// /Creating mini app

const userRouter=express.Router();
const authRouter=express.Router();
// BASE ROUTER
app.use("/user",userRouter);
app.use("/auth",authRouter);

userRouter
.route('/')
.get(getUsers)    //path specific middleware
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



async function getUsers(req,res){
        // console.log(req.query);
        // res.send(users);
        
        let allUsers= await userModel.find()
        // let allUsers= await userModel.findOne({name:"Abhishek"})

        res.json({message:'list of all users',
                data:allUsers});
        }

function postUser(req,res){
    console.log(req.body)
    users=req.body
    res.json({
        message :"data received successfully",
        user:req.body
    })
}    

async function updateUser(req,res){
    console.log('req.body->',req.body  );

    //update data in user object
    let dataToBeUpdated=req.body;
    // for(key in dataToBeUpdated){
    //     users[key]=dataToBeUpdated[key]
    // }
    let user =await userModel.findOneAndUpdate({email:'rani@gmail.com'},dataToBeUpdated);

    res.json({
            message:"data updated successfully",
});
}

async function deleteUser(req,res){
    // users={}
    let dataToBeDeleted=req.body;
     let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:"data has been deleted",
        data:user 
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

async function postSignUp(req,res){
  let dataObj=req.body;
  let user= await userModel.create(dataObj); 
  console.log("backend",user)
  res.json({
    message:"user Signed up",
    data:user
  }); 
}

