const {format}= require('date-fns');
const {v4:uuid} = require('uuid');
console.log(format(new Date(),'yyyMMdd\tHH:mm:ss'));


console.log(uuid());

console.log(uuid());

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { Console } = require('console');

const LogEvents = async(message,logName)=>{
    const dateTime = `${format(new Date(),'yyyMMdd\tHH:mm:ss')}`;
    const LogItem = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(LogItem);
    try{
        if (!fs.existsSync(path.join(__dirname,'..','logs')))
        {
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logName),LogItem);
    }catch(err){
        Console.log(err);
    }
}

const logger =    (req,res,next) =>{
        LogEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqlog.txt');
        console.log(`${req.method}${req.path}`);
        next()
    }


module.exports ={logger, LogEvents};