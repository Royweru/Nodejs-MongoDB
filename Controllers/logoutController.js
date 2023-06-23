const User = require('../model/User');





const handleLogout = async (req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt)return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshTOken = cookies.jwt;

    const foundUser = await User.findOne({refreshTOken}).exec();
    if(!foundUser){ 
        res.clearCookie('jwt', {httpOnly:true, sameSite:'none',secure:true});
        return res.sendStatus(204);
    }
    
    foundUser.refreshToken= '';
    const result = await foundUser.save();
   console.log(result); 
    
    res.clearCookie('jwt',{httpOnly:true, sameSite:'none',secure:true});
    res.sendstatus(204);
}
module.exports = {handleLogout};