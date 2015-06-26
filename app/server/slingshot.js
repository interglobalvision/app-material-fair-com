/*  region: Meteor.settings.aws_region,
  accessKeyId: Meteor.settings.aws_accesskeyid,
  secretAccessKey: Meteor.settings.aws_secretaccesskey,
  bucket: Meteor.settings.aws_bucket,*/

Slingshot.createDirective("imageUpload", Slingshot.S3Storage, {
  bucket: Meteor.settings.aws_bucket,

  acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    return this.userId + "/image/" + file.name;
  }
});

Slingshot.createDirective("pdfUpload", Slingshot.S3Storage, {
  bucket: Meteor.settings.aws_bucket,

  acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    return this.userId + "/pdf/" + file.name;
  }
});