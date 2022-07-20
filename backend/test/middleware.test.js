import {
  loginRequired,
  oauthBlocker,
  adminRequired,
  errorHandler,
  upload,
} from "../middlewares";
import { JWT_COOKIE_KEY } from "../utils";
import { AUTH_ENUM } from "../passport";
import { ForbiddenError } from "../errors";

let res, next;
beforeEach(() => {
  res = {};
  next = jest.fn();
});

describe("oauthBlocker", () => {
  test("oauth 계정인 경우 next를 호출한다.", () => {
    const req = {
      user: {
        oauth: AUTH_ENUM.LOCAL,
      },
    };
    oauthBlocker(req, res, next);
    expect(next).toBeCalledTimes(1);
  });
  test("oauth 계정이 아닌 경우 ForbiddenError를 throw한다.", () => {
    const req = {
      user: {
        oauth: "not" + AUTH_ENUM.LOCAL,
      },
    };
    expect(() => {
      oauthBlocker(req, res, next);
    }).toThrow(ForbiddenError);
  });
});

describe("adminRequired", () => {
  test("admin 계정인 경우 next를 호출한다.", () => {
    const req = {
      user: {
        role: "admin",
      },
    };
    adminRequired(req, res, next);
    expect(next).toBeCalledTimes(1);
  });
  test("admin 계정이 아닌 경우 ForbiddenError를 throw한다.", () => {
    const req = {
      user: {
        role: "not" + "admin",
      },
    };
    expect(() => {
      adminRequired(req, res, next);
    }).toThrow(ForbiddenError);
  });
});

// describe("LoginRequired", () => {
// });
// describe("errorHandler", () => {
// });
// describe("upload", () => {
// });
