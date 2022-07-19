import {
  loginRequired,
  oauthBlocker,
  adminRequired,
  errorHandler,
  multer,
} from "../middlewares";
import { JWT_COOKIE_KEY } from "../utils";
import { AUTH_ENUM } from "../passport";
import { ForbiddenError } from "../errors";

let res, next;
beforeEach(() => {
  res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  next = jest.fn();
});
// describe("LoginRequired", () => {
//   test('로그인되어 있다면 passport.authenticate("jwt")를 리턴해야 함', () => {
//     const req = {
//       cookies: jest.fn(() => {
//         return { [JWT_COOKIE_KEY]: true };
//       }),
//     };
//     loginRequired(req, res, next);
//     expect(next).toBeCalledTimes(1);
//   });
// });

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

// describe("oauthBlocker", () => {});
