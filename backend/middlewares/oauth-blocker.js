import { ForbiddenError } from "../errors";

// oauth 계정이 사용 불가능한 서비스를 요청했을 때 막는 미들웨
const oauthBlocker = (req, res, next) => {
  if (req.user.oauth !== "local") {
    throw new ForbiddenError("소셜 계정은 이용할 수 없는 기능입니다.");
  }
  next();
};

export { oauthBlocker };
