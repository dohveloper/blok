import { ForbiddenError } from "../errors";

const oauthBlocker = (req, res, next) => {
  if (req.user.oauth !== "local") {
    throw new ForbiddenError("소셜 계정은 이용할 수 없는 기능입니다.");
  }
  next();
};

export { oauthBlocker };
