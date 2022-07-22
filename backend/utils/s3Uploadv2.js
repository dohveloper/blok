import { S3 } from "aws-sdk";

const s3Uploadv2 = async (file) => {
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}`,
    Body: file.buffer,
    ContentType: "image/png",
  };
  return await s3.upload(param).promise();
};

export { s3Uploadv2 };
