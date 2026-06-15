const http = require('http'); // newtork module offer by nodejs
const fs = require('fs');       // file system module offer by nodejs
const path = require('path');   // imports Node.js's built-in Path module.

// we need port jisse browser and server connect kare 
const port = 3000;

const server = http.createServer((req,res)=>{

    // we can to that if the req.url is '/' then we will serve index.html file 
    // so for that first of all we need to find the path of pur index.html file which will be done by filesystem module

    const filePath = path.join(__dirname, req.url ==='/' ?"index.html": req.url)
    //console.log(filePath)
    const extName = String(path.extname(filePath)).toLowerCase() 
    
    // we does because some people provide extension as .HTML or .html so we need to convert it into lower case
    
    const mimeTypes ={
        '.html':'text/html',
        '.js':'text/javascript',
        '.css':'text/css',
    }
    const contentType = mimeTypes[extName] || 'application/octet-stream'
    
    //  agar extName hamare mimeTypes object me nahi hai to hum application/octet-stream ko default value ki tarah use kar sakte hai 
    
    // 'application/octet-stream' is a generic binary file type that can be used when the specific file type is unknown or not supported. It indicates that the content is binary data and should be treated as such by the browser or client.

    // now we will read the file or send response 
    fs.readFile(filePath,(err,content)=>{
        if(err){
            if(err.code ==='ENOENT'){
                // head
                res.writeHead(404,{'content-Type':'text/html'})
                // body
                res.end("404: File not found")
            }
        }
        else{
            // for haead
            res.writeHead(200,{'content-Type':contentType}); // 200 means everything is ok and content type is set to the contentType we determined earlier
            // for body
            res.end(content,'utf-8');  // content is the data we read from the file and 'utf-8' is the encoding format for english and other words

        }
    })
});

server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
});