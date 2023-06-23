const {LogEvents} = require('./logEvents')

const errorHandler = (err,req, res,next)=>{
    LogEvents(`${err.name}:${err.messsage}`,'errLog.txt');
    console.error(err.stack)
    res.status(500).send(err.messsage);
};

module.exports = errorHandler;