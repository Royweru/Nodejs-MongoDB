const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const LogEvents = require('./logEvents');
const EventEmmiter = require('events');
const { url } = require('inspector');

class MyEmitter extends EventEmmiter{};

const myEmitter = new MyEmitter();

const PORT = process.env.port || 3500;
const serverFile = async(filePath,contentType,response)=>{
    try{
        const data = await fsPromises.readFile(filePath,'utf8');
        response.writeHead(200,{'contentType':contentType});
        response.end(data)
    }catch(err){
        console.log(err);
        response.statusCode = 500;
        response.end();
}}

const server = http.createServer((req,res)=>{
    console.log(req.url,req.method);

 const extension = path.extname(req.url);
 let contentType;

 switch(extension){
    case '.css':
        contentType= 'text/css';
        break;
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.json':
        contentType='application/json';
        break;
    case '.jpg':
        contentType = 'image/jpeg';
         break;
    case '.png':
        contentType = 'image/png'
        break;
    case '.txt':
        contentType='text/plain';
        break;
    default:
        contentType ='.text/html'
 }
 let filePath =
   contentType === 'text/hmtl'&& req.url == '/'?
    path.join(__dirname,'views','index.html')
    :contentType ==='text/html'&& req.url.slice(-1) === '/'
     ?path.join(__dirname,'views',req.url,'index.html')
     :contentType === 'text/html'
      ?path.join(__dirname,'views',req.url)
      :path.join(__dirname,req.url)

      if(!extension&& req.url.slice(-1) !== '/')filePath += 'html';

      fileExists = fs.existsSync(filePath);

      if(fileExists){
        serverFile(filePath,contentType,res);

      }else{
       switch(path.parse(filePath).base){ 
        case'old-page.html':
         res.writeHead(301,{'location':'/new-page.html'});
         res.end();
         break;
        case'www-page.html':
          res.writeHead(301,{'location':'/ '});
          res.end()
          break;
        default:
            serverFile(path.join(__dirname,'views','404.html'),'text/html',res)
              }
      }

});
server.listen(PORT,() =>console.log(`server is running on port${PORT}`));