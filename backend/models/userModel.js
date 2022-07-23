import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    phone: {type: String, required: true},
    activated: {type: Boolean, required:false, default: false},
},{
    timestamps: true
})

const UserModel = mongoose.model('User', UserSchema, 'users');

export default UserModel;