import { Strategy } from "passport-kakao";
import { authService } from "../../services";
import { userJWTObjectMaker } from "../../utils";
import dotenv from "dotenv";

dotenv.config();
// 환경변수 설정
const config = {
  clientID: process.env.KAKAO_CLIENT_ID,
  callbackURL: `/api/auth/kauth`,
};

// kakaoStrategy 부분
const kakao = new Strategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    // 로그인 요청한 유저정보
    const newUser = {
      email: null,
      userName: profile.displayName,
      profileImage: profile._json.properties.thumbnail_image,
    };
    try {
      // 유저를 찾으면 로그인 시켜주고, 아니면 회원가입
      const user = await authService.findOrCreateUser(newUser, "kakao");
      // user 정보 전달, jwt 생성을 위함.
      done(null, userJWTObjectMaker(user));
    } catch (e) {
      done(e, null);
    }
  }
);

export { kakao };
