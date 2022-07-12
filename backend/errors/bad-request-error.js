import { CustomError } from "./";

// 400 code
class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export { BadRequestError };
