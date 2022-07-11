import passport from "passport";
import { local, jwt, google, kakao } from "./strategies";

export default () => {
  // local, jwt strategy 사용, kauth, oauth.google 추가 예정
  passport.use(local);
  passport.use(jwt);
  passport.use(google);
  passport.use(kakao);
};
