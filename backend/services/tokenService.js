import jwt from "jsonwebtoken";
import RefreshModel from "../models/refreshModel.js";

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;

class TokenService{
    static generateTokens = (payload)=>{
        const accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: '1m'
        })

        // used to create again accessToken when it gets expired 
        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: '1y'
        })

        return {accessToken, refreshToken};
    }

    static storeRefreshToken = async (token, userId)=>{
        try {
            await RefreshModel.create({
                token,
                userId
            })
        } catch (error) {
            console.log(error);
        }
    }

    static verifyAccessToken = async (token)=>{
        return jwt.verify(token, accessTokenSecret);
    }

    static verifyRefreshToken = async (refreshToken)=>{
        return jwt.verify(refreshToken, refreshTokenSecret);
    }

    static findRefreshToken = async (userId, refreshToken)=>{
        return await RefreshModel.findOne({userId: userId, token: refreshToken});
    }

    static updateRefreshToken = async (userId, refreshToken)=>{
        return await RefreshModel.updateOne({userId:userId}, {token: refreshToken});
    }

    static removeToken = async (refreshToken) => {
        await RefreshModel.deleteOne({token: refreshToken});
    }
}

export default TokenService;