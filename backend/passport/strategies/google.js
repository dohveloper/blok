import { Strategy } from "passport-google-oauth20";
import { authService } from "../../services";
import { userJWTObjectMaker } from "../../utils";
import dotenv from "dotenv";

dotenv.config();
// 환경변수 설정
const config = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback",
};

// googleStrategy 부분
const google = new Strategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    // 로그인 요청한 유저정보
    const newUser = {
      email: profile._json.email,
      userName: profile.displayName,
      profileImage: profile.photos[0].value,
    };
    try {
      // 유저를 찾으면 로그인 시켜주고, 아니면 회원가입
      const user = await authService.findOrCreateUser(newUser, "google");
      // 정보를 전달하여 jwt토큰으로 만들어줌
      done(null, userJWTObjectMaker(user));
    } catch (e) {
      done(e, null);
    }
  }
);

export { google };
