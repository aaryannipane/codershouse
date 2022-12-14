import Jimp from "jimp";
import path from "path";
import { fileURLToPath } from "url";
import UserService from "../services/userService.js";
import UserDto from "../dtos/user-dto.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ActivateController {
  static activate = async (req, res) => {
    const { name, avatar } = req.body;

    if (!name || !avatar) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // image is in Base64
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    try {
      const jimpResp = await Jimp.read(buffer);
      jimpResp
        .resize(150, Jimp.AUTO)
        .writeAsync(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (error) {
      return res.status(500).json({ message: "could not process the image" });
    }

    const userId = req.user._id;

    // Update User
    try {
      const user = await UserService.findUser({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();
      res.json({ user: new UserDto(user), auth: true });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };
}

export default ActivateController;
