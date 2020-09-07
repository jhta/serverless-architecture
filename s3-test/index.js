const im = require("imagemagick");
const fs = require("fs");
const os = require("os");
const { promisify } = require("util");
const AWS = require("aws-sdk");

const resizeAsync = promisify(im.resize);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

AWS.config.update({ region: "us-west-2" });
const s3 = new AWS.S3();

const getFileParamsToResize = async (bucketName, fileName, tempFile) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
  };

  const inputData = await s3.getObject(params).promise();

  return {
    srcData: inputData.Body,
    dstPath: tempFile,
    width: 150,
  };
};

const pushResizedImage = async (bucketName, fileName, tempFile) => {
  let resizedImage = await readFileAsync(tempFile);
  const targetFilename =
    fileName.substring(0, fileName.lastIndexOf(".")) + "-small.jpg";

  const params = {
    Bucket: bucketName + `-dst`,
    Key: targetFilename,
    Body: new Buffer(resizedImage),
    ContentType: "image/jpeg",
  };

  s3.putObject(params).promise();
};

const resizeImage = async ({ s3: { bucket, object } }) => {
  const { name: bucketName } = bucket;
  const { key: fileName } = object;
  const tempFile =
    os.tmpdir() + "/" + Math.floor(Math.random() * 10000) + ".jpg";

  const resizeArgs = await getFileParamsToResize(
    bucketName,
    fileName,
    tempFile
  );

  await resizeAsync(resizeArgs);

  await pushResizedImage(bucketName, fileName, tempFile);

  return await unlinkAsync(tempFile);
};

exports.handler = async (event) => {
  const filesProcessed = event.Records.map(resizeImage);
  await Promise.all(filesProcessed);
  console.log("done");
  return "Done!";
};
