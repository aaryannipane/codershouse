import RoomDto from "../dtos/room-dto.js";
import RoomService from "../services/roomService.js";
class RoomController {
  static create = async (req, res) => {
    // room creation logic
    const { topic, roomType } = req.body;

    if (!topic || !roomType) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const room = await RoomService.create({
      topic,
      roomType,
      ownerId: req.user._id,
    });

    res.json(new RoomDto(room));
  };

  static index = async (req, res) => {
    console.log("Hello");
    const rooms = await RoomService.getAllRooms(["open"]);
    const allRooms = rooms.map((room) => {
      return new RoomDto(room);
    });
    return res.json(allRooms);
  };

  static show = async (req, res) => {
    const room = await RoomService.getRoom(req.params.roomId);
    return res.json(room);
  };
}

export default RoomController;
