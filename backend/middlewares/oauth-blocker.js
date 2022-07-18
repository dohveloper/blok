import { ForbiddenError } from "../errors";
import { AUTH_ENUM } from "../passport";

const oauthBlocker = (req, res, next) => {
  if (req.user.oauth !== AUTH_ENUM.LOCAL) {
    throw new ForbiddenError("소셜 계정은 이용할 수 없는 기능입니다.");
  }
  next();
};

export { oauthBlocker };
