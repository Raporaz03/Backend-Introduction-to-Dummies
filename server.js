// server creation 

// 1. http module

const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server= http.createServer((req,res)=>{
    console.log("Request has been made from server");
    // console.log(req.method);
    // console.log(req.url);

    //lodash
    let num=_.random(0,20);
    console.log(num);

  let greet =_.once(()=>{
    console.log('hello');
  });

greet();
greet();
    
    res.setHeader('Content-Type','text/html');
  
    // res.write('<h1>Hello , Pepcoders ! :)</h1>');
    // res.write('<h2>Hello , Rapobots ! :)</h2>');
    // res.end();
    let path ='./views';
    switch (req.url) {
        case "/":
            path+='/index.html'
            res.statusCode=200;
            break;
        case "/about":
            path+='/about.html'
            res.statusCode=200;
            break;
        case "/about-me":
            res.statusCode=301;
            res.setHeader('Location',"/about");
            res.end();
            break;
    
        default:
            path+="/404.html"
            res.statusCode=404;
            break;
    };

    
    fs.readFile(path,(err,fileData)=>{
      if(err){
        console.log(err);
      }  
      else{
        // res.write(fileData);    
        // we use write for multiple statements and for single end is enough
        res.end(fileData);
      } 
    })
});

// port number, ho st ,call back function
server.listen(3000,'localhost',()=>{
    console.log("server is listening on port 3000")
});

 