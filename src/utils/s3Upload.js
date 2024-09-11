import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const uploadFileToS3 = async (file, onSuccess, onError) => {
  const S3_BUCKET = import.meta.env.VITE_S3;
  const REGION = import.meta.env.VITE_REGION;
  const ACCESS_KEY_ID = import.meta.env.VITE_ACCESS_KEYID;
  const SECRET_ACCESS_KEY = import.meta.env.VITE_SECRET_ACCESSKEY;

  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: file.name,
    Body: file,
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);
    const location = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`;
    if (onSuccess) onSuccess(location);
  } catch (err) {
    console.error("Error uploading file:", err);
    if (onError) onError(err);
  }
};

export default uploadFileToS3;
