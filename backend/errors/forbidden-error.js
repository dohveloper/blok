import { CustomError } from "./";

// 400 code
class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

export { ForbiddenError };
