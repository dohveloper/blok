import { userController } from "../../controller";
import { BadRequestError, ForbiddenError } from "../../errors";
import { userService } from "../../services";

let req, res, next;
beforeEach(() => {
  req = {};
  res = {
    statusCode: 0,
    json: {},
    cookies: {},
    ok: function (statusCode, json) {
      this.statusCode = statusCode;
      this.json = json;
    },
    okWithDeleteCookie: function (statusCode, COOKIE_KEY) {
      this.statusCode = statusCode;
      req.cookies[COOKIE_KEY] = false;
    },
  };
  next = jest.fn();
});
const user = {
  name: "test",
  email: "test@email.com",
  password: "123123",
};

describe("register", () => {
  jest.spyOn(userService, "addUser").mockResolvedValue({
    user: user,
  });
  // 작동 안함;;
  // test("req.body가 emptyobject일 때", async () => {
  //   const req = {
  //     body: {},
  //   };
  //   expect(async () => {
  //     await userController.register(req, res, next);
  //   }).rejects.toThrow(BadRequestError);
  // });

  // email BadRequestError

  // password BadRequestError

  test("req.body가 입력되었을 때, 상태코드 200, return user", async () => {
    req = {
      body: user,
    };
    await userController.register(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res.json).toEqual({ user });
  });
});

describe("resetPassword", () => {
  jest.spyOn(userService, "passwordReset").mockResolvedValue({});

  test("req.body가 입력되었을 때, 상태코드 201. 메세지 return", async () => {
    req = {
      body: user,
    };
    await userController.resetPassword(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res.json).toEqual({
      message: "비밀번호가 초기화 되었습니다!",
    });
  });
});

describe("userDelete", () => {
  const userId = Math.ceil(Math.random() * 1000).toString();
  jest.spyOn(userService, "deleteUser").mockResolvedValue({});
  test("req.params와 req.user의 userId가 같으면 유저가 삭제되고 204 statuscode", async () => {
    req.user = {
      userId,
    };
    req.params = {
      userId,
    };
    console.log(req);
    await userController.userDelete(req, res, next);
    expect(res.statusCode).toBe(204);
  });
  // test("req.params와 req.user의 userId가 다를때 FobiddenError", async () => {
  //   req.user = {
  //     userId: "not" + userId,
  //   };
  //   expect(async () => {
  //     await userController.userDelete(req, res, next);
  //   }).rejects.toThrow(ForbiddenError);
  // });
  // discribe("logout", () => {});
});
