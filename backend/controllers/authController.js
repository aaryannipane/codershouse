import HashService from "../services/hashService.js";
import OtpService from "../services/otpService.js";
import TokenService from "../services/tokenService.js";
import UserService from "../services/userService.js";
import UserDto from "../dtos/user-dto.js";

class AuthController {
  static sendOtp = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone field is required" });
    }

    const otp = await OtpService.generateOtp();

    // Hash
    const ttl = 1000 * 60 * 2; //2min time to live
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = HashService.hashOtp(data);

    try {
      // await OtpService.sendBySms(phone, otp)

      res.json({
        hash: `${hash}.${expires}`,
        phone: phone,
        otp,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "message sending failed" });
    }
  };

  static verifyOtp = async (req, res) => {
    const { otp, hash, phone } = req.body;

    if (!otp || !hash || !phone) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({
        message: "OTP expired!",
      });
    }

    const data = `${phone}.${otp}.${expires}`;
    const isValid = await OtpService.verifyOtp(hashedOtp, data);
    if (!isValid) {
      return res.status(400).json({
        message: "invalid OTP",
      });
    }

    let user;
    try {
      user = await UserService.findUser({ phone: phone });
      if (!user) {
        user = await UserService.createUser({ phone: phone });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "DB error" });
    }

    // JWT TOKEN used like session
    const { accessToken, refreshToken } = TokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    await TokenService.storeRefreshToken(refreshToken, user._id);

    // send cookie to client than each req will come with this cookie (this cookie is httpOnly that means clients js can't read it only server can read it)
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDto(user);

    res.json({ user: userDto, auth: true });
  };

  static refresh = async (req, res) => {
    // get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;

    // check if token is valid
    let userData;
    try {
      userData = await TokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    // check if token is in db
    try {
      const token = await TokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }

    // check if valid user
    const user = await UserService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(404).json({ message: "No User" });
    }

    // generate new token
    const { refreshToken, accessToken } = TokenService.generateTokens({
      _id: userData._id,
    });

    // update refresh token
    try {
      await TokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "internal error" });
    }

    // put in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  };

  static logout = async (req, res) => {
    const { refreshToken } = req.cookies;
    await TokenService.removeToken(refreshToken);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ user: false, auth: false });
  };
}

export default AuthController;
