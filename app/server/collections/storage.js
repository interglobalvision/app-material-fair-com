var fileStore = new FS.Store.S3("storage", {
  region: Meteor.settings.aws_region,
  accessKeyId: Meteor.settings.aws_accesskeyid,
  secretAccessKey: Meteor.settings.aws_secretaccesskey,
  bucket: Meteor.settings.aws_bucket,
});

Storage = new FS.Collection("storage", {
  stores: [fileStore,],
});

Storage.allow({
  insert: function() {
    return true;
  },

  download: function () {
    return true;
  },

  remove: function(){
    return false;
  },

  fetch: null,
});

/*
Storage = new FS.Collection("storage", {
  stores: [fileStore,],
});

// Allow/Deny
Storage.allow({
  insert: function(userId, doc) {
    return true;
  },

  download: function(userId) {
    return true;
  },

  remove: function(userId, doc){
    return false;
  },
});*/