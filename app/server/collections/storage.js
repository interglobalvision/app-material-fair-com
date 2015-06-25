var bucketName = process.env.AWS_BUCKET,
fileStore = new FS.Store.S3("storage", {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  bucket: 'material-art-fair',
});

Storage = new FS.Collection("storage", {
  stores: [fileStore],
});