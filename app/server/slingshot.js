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
    var filename = file.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    return this.userId + '/image/' + Random.id(10) + filename;
  },

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
    var filename = file.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    return this.userId + '/pdf/' + Random.id(10) + filename;
  },

});