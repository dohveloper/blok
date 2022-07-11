import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { viewsRouter, userRouter } from "./routers";
import { errorHandler, getUserFromJWT } from "./middlewares";
import passport from "passport";
import passportStrategies from "./passport";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.SERVER_PORT || 8000;
const app = express();

app.listen(PORT, function () {
  console.log(`listening on http://localhost:${PORT}`);
});

const DB_URL =
  process.env.MONGODB_URL ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요. \n.env 파일도 필요합니다.\n";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다. " + DB_URL)
);
db.on("error", (error) =>
  console.error("\nMongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

// CORS 에러 방지
app.use(cors());

// cookieParser 사용
app.use(cookieParser());

// passport 전략 사용
passportStrategies();

// body parser 부분
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 테스팅용 라우터, 제거예정
app.get("/", function (req, res) {
  res.send("<h1>welcome page</h1>");
});

// passport 사용
app.use(passport.initialize());

// JWT 인증 미들웨어 사용
app.use(getUserFromJWT);

// api 라우팅
// 아래처럼 하면, userRouter 에서 '/login' 으로 만든 것이 실제로는 앞에 /api가 붙어서
// /api/login 으로 요청을 해야 하게 됨. 백엔드용 라우팅을 구분하기 위함임.
app.use("/api", userRouter);

// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨
app.use(errorHandler);

export { app };
