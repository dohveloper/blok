import { customAlphabet } from "nanoid";

// shordId 사용을 위한 nanoid 사용
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
