const express = require("express");

const app = express();
app.listen(3000);


app.get('/', function (req, res) {
    // res.send('<h1>Hello World<h1>')   //we do not have to write res.write and res.end
    
    res.sendFile('./views/index.html',{root:__dirname});
  })
  
  app.get('/about', function (req, res) {
    //   res.send('<h1>About <h1>')  
       //we do not have to write res.write and res.end

    res.sendFile('./views/about.html',{root:__dirname})   
    
  })

  //redirect

  app.get('/about-us',(req,res)=>{
    res.redirect('/about');
  })

  //404 page
  app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname})
  }) 

    
// get/post/patch/delete   =    get/set/update/delete


