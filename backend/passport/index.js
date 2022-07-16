import passport from "passport";
import { local, jwt, google } from "./strategies";

const AUTH_ENUM = {
  GOOGLE: "google",
  LOCAL: "local",
};

const passportStrategies = () => {
  passport.use(local);
  passport.use(jwt);
  passport.use(google);
};

export { AUTH_ENUM, passportStrategies };
