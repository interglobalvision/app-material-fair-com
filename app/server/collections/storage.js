var fileStore = new FS.Store.S3("storage", {
  region: Meteor.settings.aws_region,
  accessKeyId: Meteor.settings.aws_accesskeyid,
  secretAccessKey: Meteor.settings.aws_secretaccesskey,
  bucket: Meteor.settings.aws_bucket,
});

Storage = new FS.Collection("storage", {
  stores: [fileStore],
});