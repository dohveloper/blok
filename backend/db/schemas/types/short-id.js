import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("01234567899abcedf", 6);

const shortId = {
  type: String,
  default: () => {
    return nanoid();
  },
  require: true,
  index: true,
};

export { shortId };
