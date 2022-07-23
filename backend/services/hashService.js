import crypto from "crypto";

class HashService{  
    static hashOtp = (data)=>{
        const hash = crypto.createHmac('sha256', process.env.HASH_SECRET_KEY).update(data).digest('hex')
        return hash;
    }

}

export default HashService;