import UserModel from "../models/userModel.js";

class UserService{
    static findUser = async (filter)=>{
        const user = await UserModel.findOne(filter);
        return user;
    }

    static createUser = async (data)=>{
        const user = await UserModel.create(data);
        return user;
    }
}

export default UserService;