// server creation 

// 1. http module

const http = require('http');
const fs = require('fs');

const server= http.createServer((req,res)=>{
    console.log("Request has been made from server");
    // console.log(req.method);
    // console.log(req.url);
    
    res.setHeader('COntent-Type','text/html');
  
    // res.write('<h1>Hello , Pepcoders ! :)</h1>');
    // res.write('<h2>Hello , Rapobots ! :)</h2>');
    // res.end();
    let path ='./views';
    switch (req.url) {
        case "/":
            path+='/index.html'
            break;
        case "/about":
            path+='/about.html'
            break;
    
        default:
            path+="/404.html"
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

 