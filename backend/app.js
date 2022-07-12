import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routers";
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

// api 라우팅
app.use("/api/user", userRouter);

// errorHandler
app.use(errorHandler);

export { app };
