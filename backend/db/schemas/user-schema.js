import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    userDomain: [
      {
        type: Schema.Types.ObjectId,
        ref: "domain",
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
      enum: ["local", "kakao", "google"],
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
