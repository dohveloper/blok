import { CustomError } from "./";

// 400 code
class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

export { NotFoundError };
