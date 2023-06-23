const allowedOrigins = require('../Config folder/allowedOrigins');

const credentials = (req,res,next)=>{
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.header('Access-control-Allow-Credentials',true);
    }next();
}

module.exports = credentials