import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    roomType: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    speakers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// model name, schema, collection name
const RoomModel = mongoose.model("Room", RoomSchema, "rooms");
export default RoomModel;
