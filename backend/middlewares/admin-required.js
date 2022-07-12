function adminRequired(req, res, next) {
  // passport jwt를 사용하고 있기 때문에, req.user.role에 복호화한 jwt토큰의 role값이 들어감.
  if (req.user.role !== "admin-user") {
    res.status(403).json({
      result: "forbidden-approach",
      reason: "admin 유저만 사용할 수 있는 서비스입니다.",
    });
    return;
  }
  next();
}

export { adminRequired };
