import { Strategy } from "passport-kakao";
import { authService } from "../../services";
import { userJWTObjectMaker } from "../../utils";
import dotenv from "dotenv";

dotenv.config();
const config = {
  clientID: process.env.KAKAO_CLIENT_ID,
  callbackURL: `/api/auth/kauth`,
};

const kakao = new Strategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      email: null,
      userName: profile.displayName,
      profileImage: profile._json.properties.thumbnail_image,
    };
    try {
      const user = await authService.findOrCreateUser(newUser, "kakao");
      done(null, userJWTObjectMaker(user));
    } catch (e) {
      done(e, null);
    }
  }
);

export { kakao };
