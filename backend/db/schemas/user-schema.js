import { Schema } from "mongoose";
import { AUTH_ENUM } from "../../passport";
// 왜 undefined지?
// console.log(AUTH_ENUM);

const UserSchema = new Schema(
  {
    sites: [
      {
        type: Schema.Types.ObjectId,
        ref: "sites",
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
      type: String,
      // enum: [AUTH_ENUM.LOCAL, AUTH_ENUM.GOOGLE],
      // default: AUTH_ENUM.LOCAL,
      enum: ["local", "google"],
      default: "local",
    },
    role: {
      type: String,
      enum: ["admin", "basic"],
      default: "basic",
    },
    plan: {
      type: String,
      default: "free",
      // 추가 예정
      enum: ["free", "paid"],
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
