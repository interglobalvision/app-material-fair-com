/*  region: Meteor.settings.aws_region,
  accessKeyId: Meteor.settings.aws_accesskeyid,
  secretAccessKey: Meteor.settings.aws_secretaccesskey,
  bucket: Meteor.settings.aws_bucket,*/

Slingshot.createDirective('imageUpload', Slingshot.S3Storage, {
  bucket: Meteor.settings.aws_bucket,

  acl: 'public-read',

  authorize: function () {
    if (!this.userId) {
      throw new Meteor.Error('not-signed-in', 'You must register a user first before uploading a file.');
    }

    return true;
  },

  key: function (file) {
    // Store file into a directory by the user's username.
    return this.userId + '/image/' + file.name;
  }
});

Slingshot.createDirective('docUpload', Slingshot.S3Storage, {
  bucket: Meteor.settings.aws_bucket,

  acl: 'public-read',

  authorize: function () {
    if (!this.userId) {
      throw new Meteor.Error('not-signed-in', 'You must register a user first before uploading a file.');
    }

    return true;
  },

  key: function (file) {
    // Store file into a directory by the user's username.
    return this.userId + '/pdf/' + file.name;
  }
});