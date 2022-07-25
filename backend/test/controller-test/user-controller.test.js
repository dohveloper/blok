import { userController } from "../../controller";
import { BadRequestError, ForbiddenError } from "../../errors";
import { userService } from "../../services";

let req, res, next, user;
function setMockUser() {
  user = {
    name: "test",
    email: "test@email.com",
    password: "123123",
  };
}
function setMockReqResNext() {
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
}

describe("register", () => {
  beforeAll(async () => {
    setMockUser();
    jest.spyOn(userService, "addUser").mockResolvedValue({
      user,
    });
  });
  beforeEach(() => {
    setMockUser();
    setMockReqResNext();
  });
  // 작동 안함...
  // test("req.body가 emptyobject일 때", async () => {
  //   expect.assertions(1);
  //   try {
  //     req = {
  //       body: {},
  //     };
  //     await userController.register(req, res, next);
  //     console.log(await userController.register(req, res, next));
  //   } catch (e) {
  //     expect(e).toMatch("123");
  //   }
  //   // await expect(async () => {
  //   //   await userController.register(req, res, next);
  //   // }).rejects.toThrow(BadRequestError);
  // });

  // test("이메일의 형식이 맞지 않을때", async () => {
  //   const req = {
  //     body: { email: "notEmail" },
  //   };
  //   await expect(async () => {
  //     await userController.register(req, res, next);
  //   }).rejects.toThrow(BadRequestError);
  // });

  // test("비밀번호의 길이가 6자리 미만일 때", async () => {
  //   const req = {
  //     body: { ...user, password: "12345" },
  //   };
  //   await expect(async () => {
  //     await userController.register(req, res, next);
  //   }).rejects.toThrow(BadRequestError);
  // });

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
  beforeAll(() => {
    jest.spyOn(userService, "passwordReset").mockResolvedValue({});
  });
  beforeEach(() => {
    setMockUser();
    setMockReqResNext();
  });
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
  let userId;
  beforeAll(() => {
    jest.spyOn(userService, "deleteUser").mockResolvedValue({});
  });
  beforeEach(() => {
    userId = Math.ceil(Math.random() * 1000).toString();
  });
  test("req.params와 req.user의 userId가 같으면 유저가 삭제되고 204 statuscode", async () => {
    req.user = {
      userId,
    };
    req.params = {
      userId,
    };
    await userController.userDelete(req, res, next);
    expect(res.statusCode).toBe(204);
  });
  // 작동 안함..
  // test("req.params와 req.user의 userId가 다를때 FobiddenError", async () => {
  //   req.user = {
  //     userId: "not" + userId,
  //   };
  //   req.params = {
  //     userId,
  //   };
  //   await expect(async () => {
  //     await userController.userDelete(req, res, next);
  //   }).rejects.toThrow(ForbiddenError);
  // });
  // discribe("logout", () => {});
});
