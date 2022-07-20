import { ForbiddenError } from "../errors";

function adminRequired(req, res, next) {
  // passport jwt를 사용하고 있는 loginRequired 미들웨어를 거쳤기 때문에, req.user.role에 복호화한 jwt의 role값이 들어감.
  if (req.user.role !== "admin") {
    throw new ForbiddenError("admin 유저만 사용할 수 있는 서비스입니다.");
  }
  next();
}

export { adminRequired };
