import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    name: { type: String, required: false },
    avatar: {
      type: String,
      required: false,
      get: (avatar) => {
        if (avatar) {
          return `${process.env.BASE_URL}${avatar}`;
        }

        return avatar;
      },
    },
    activated: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const UserModel = mongoose.model("User", UserSchema, "users");

export default UserModel;
