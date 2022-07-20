import { Router } from "express";
import passport from "passport";
import { authController } from "../controller";
import { oauthBlocker } from "../middlewares";

const authRouter = Router();

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  oauthBlocker,
  authController.login
);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  authController.googleOauth
);

export { authRouter };
