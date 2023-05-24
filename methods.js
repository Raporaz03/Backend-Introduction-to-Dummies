const express = require("express");

const app = express();
//middleware function -> post, front->json
app.use(express.json());
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
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById)

authRouter
.route('/signup')
.get(getSignUp)
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

function getSignUp(req,res){
    res.sendFile('public/index.html',{root:__dirname});
}

function postSignUp(req,res){
  let obj=req.body;
  console.log("backend",obj)
  res.json({
    message:"user Signed up",
    data:obj
  }); 
}