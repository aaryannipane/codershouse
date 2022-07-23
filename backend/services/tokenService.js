import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;

class TokenService{
    static generateTokens = (payload)=>{
        const accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: '1h'
        })

        // used to create again accessToken when it gets expired 
        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: '1y'
        })

        return {accessToken, refreshToken};
    }
}

export default TokenService;