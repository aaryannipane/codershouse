import RoomModel from "../models/roomModel.js";

class RoomService {
  static create = async (payload) => {
    const { topic, roomType, ownerId } = payload;

    const room = await RoomModel.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });

    return room;
  };

  static getAllRooms = async (types) => {
    const rooms = await RoomModel.find({ roomType: { $in: types } })
      .populate("speakers")
      .populate("ownerId");
    return rooms;
  };

  static getRoom = async (roomId) => {
    const room = await RoomModel.findOne({ _id: roomId });
    return room;
  };
}

export default RoomService;
