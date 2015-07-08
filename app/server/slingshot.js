/*  region: Meteor.settings.aws_region,
  accessKeyId: Meteor.settings.aws_accesskeyid,
  secretAccessKey: Meteor.settings.aws_secretaccesskey,
  bucket: Meteor.settings.aws_bucket,*/

function createFilename(filename) {
  var extension = filename.split('.').slice(0).pop();
  var sanitized = filename.replace(extension, '').replace(/\W+/g, '').toLowerCase() + '.' + extension;

  return Random.id(4) + '_' + sanitized;
}

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
    // Store file into an image directory for the user's username.
    return this.userId + '/image/' + createFilename(file.name);
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
    // Store file into a pdf directory for the user's username.
    return this.userId + '/pdf/' + createFilename(file.name);
  },

});