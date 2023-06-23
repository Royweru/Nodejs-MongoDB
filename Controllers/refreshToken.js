const User = require('../model/User');



const jwt = require('jsonwebtoken');


const handleRefreshToken = async(req,res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt)return res.status(401);
    console.log(cookies.jwt);
    const refreshTOken = cookies.jwt;

    const foundUser = await User.findOne({refreshTOken});
    if(!foundUser)return res.sendStatus(403);
    jwt.verify(
        refreshTOken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) =>{
            if (err || foundUser.username !== decoded.username)return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const acessToken = jwt.sign(
               {
                "userInfo":{
                    "username":decoded.username,
                    "roles":roles
                }
               },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
            );
            res.json({acessToken})

        }
    );
}
module.exports = {handleRefreshToken};