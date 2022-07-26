import TokenService from "../services/tokenService.js";

const authMiddleware = async (req, res, next)=>{
    try {
        const {accesstoken} = req.cookies;
        
        if(!accesstoken){
            throw new Error();
        }

        const userData = await TokenService.verifyAccessToken(accesstoken);

        if(!userData){
            throw new Error();
        }

        console.log(userData);
        req.user = userData;
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid Token"});
    }
}

export default authMiddleware;