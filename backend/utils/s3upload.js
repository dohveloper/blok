// AWS S3 업로드
import { S3 } from "aws-sdk";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.memoryStorage();

const s3Uploadv2 = async (file) => {
  const s3 = new S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}`,
    Body: file.buffer,
    ContentType: "image/png",
  };
  return await s3.upload(param).promise();
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10000000, files: 2 },
});

export { s3Uploadv2, upload };
