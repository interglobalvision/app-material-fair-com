var bucketName = process.env.AWS_BUCKET,
accessKey = process.env.AWS_ACCESSKEYID,
secretAccess = process.env.AWS_SECRETACCESSKEY,
regionName = process.env.AWS_REGION,
fileStore = new FS.Store.S3("storage", {
  region: regionName, //optional in most cases
  accessKeyId: accessKey, //required if environment variables are not set
  secretAccessKey: secretAccess, //required if environment variables are not set
  bucket: bucketName, //required
});

Storage = new FS.Collection("storage", {
  stores: [fileStore],
});