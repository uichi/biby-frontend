import AWS from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

/**
 * s3 upload file
 * @param file
 * @param dir
 * @returns
 */
export const upload = async (file: File, dir: string): Promise<any> => {
  const splitFileName = file.name.split(".");
  const extend = splitFileName[splitFileName.length - 1];
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = 32;
  const randomString = Array.from(Array(N))
    .map(() => S[Math.floor(Math.random() * S.length)])
    .join("");
  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_KEY,
    region: process.env.REACT_APP_AWS_S3_REGION,
  });
  const bucket = process.env.REACT_APP_AWS_S3_BUCKET;
  const key = `${dir}/` + randomString + "." + extend;
  const uploadPrams: S3.Types.PutObjectRequest = {
    Bucket: bucket ? bucket : "",
    Key: key,
    ContentType: file.type,
    Body: file,
  };
  return await s3.upload(uploadPrams).promise();
};
