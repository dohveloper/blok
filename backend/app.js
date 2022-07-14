import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter, adminRouter, authRouter } from "./routers";
import { errorHandler, adminRequired, loginRequired } from "./middlewares";
import passport from "passport";
import passportStrategies from "./passport";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.SERVER_PORT || 8000;
const app = express();

const DB_URL = process.env.MONGODB_URL;
mongoose.connect(DB_URL);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", () => {
  console.log("MongoDB error");
});

app.use(cors());

app.use(cookieParser());

passportStrategies();

app.use(express.json());

// 테스팅용 라우터, 제거예정
app.get("/", function (req, res) {
  res.send("<h1>welcome page</h1>");
});

app.use(passport.initialize());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", loginRequired, adminRequired, adminRouter);

app.listen(PORT, function () {
  console.log(`listening on http://localhost:${PORT}`);
});

// errorHandler
app.use(errorHandler);

export { app };