import { Schema } from "mongoose";
import { shortId } from "./types/short-id";

const UserSchema = new Schema(
  {
    // 서비스에선 objected Id 대신 shrotId 사용
    userId: shortId,
    // domain url 체크 정규표현식 필요
    // domain schema로 변경 예정
    domain: [
      {
        type: Schema.Types.ObjectId,
        ref: "sites",
        required: false,
      },
    ],
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    oauth: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin-user", "basic-user"],
      default: "basic-user",
    },
    plan: {
      type: String,
      default: "free",
      // 추가 예정
      enum: ["free"],
    },
    // true일 때 비밀번호 재설정 페이지 렌더링
    passwordReset: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { UserSchema };
