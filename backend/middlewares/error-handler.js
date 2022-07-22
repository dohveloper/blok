function errorHandler(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log("\x1b[33m%s\x1b[0m", error.stack);
  // error가 없을 경우, 500으로 설정해줌.
  const err = {
    statusCode: error.statusCode || 500,
    message: error.message || "Internal Server Error",
  };
  res.status(err.statusCode).json({ result: "error", reason: err.message });
}

export { errorHandler };
