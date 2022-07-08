import { Strategy } from "passport-kakao";
import { userService } from "../../services";
import dotenv from "dotenv";

dotenv.config();
// 환경변수 설정
const config = {
  clientID: process.env.KAKAO_CLIENT_ID,
  // callback url은 추후 수정하는걸로
  callbackURL: "http://localhost:3000/api/auth/kauth",
};

// kakaoStrategy 부분
const kakao = new Strategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    // 로그인 요청한 유저정보
    const newUser = {
      // 이메일을 필수로 받아올 수 없기때문에 일단 유저이름으로 이메일 대체함.
      email: profile.displayName,
      userName: profile.displayName,
      // profileImage: profile._json.properties.profile_image,
      profileImage: profile._json.properties.thumbnail_image,
    };
    try {
      // 유저를 찾으면 로그인 시켜주고, 아니면 회원가입
      const user = await userService.findOrCreateUser(newUser);
      // user 정보 전달, jwt 생성을 위함.
      done(null, {
        userId: user.userId,
        email: user.email,
        userName: user.userName,
        role: user.role,
        oauth: user.oauth,
        passwordReset: user.passwordReset,
      });
    } catch (e) {
      done(e, null);
    }
  }
);

export { kakao };
