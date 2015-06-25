// Methods
Meteor.methods({
  createApplication: function(application) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-signed-in', 'You must register a user first before creating an application.');
    }

    return Applications.insert(application);
  },

  serverCreateApplication: function(application) {
    return Applications.insert(application);
  },

  saveApplication: function(applicationId, applicationUpdate) {
    var application = Applications.findOne(applicationId);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-signed-in', 'You must register a user first before creating an application.');
    }

    return Applications.update(application._id, applicationUpdate);
  },

  revertApplicationToEdit: function(applicationId) {
    check(applicationId, String);

    var application = Applications.findOne(applicationId);

    if (Meteor.userId() !== application.userId) {
      throw new Meteor.Error('not-allowed', 'You must own this application to change it.');
    }

    return Applications.update(application._id, {$set: {status: 'saved',},});
  },

  submitApplication: function(applicationId) {
    check(applicationId, String);

    var application = Applications.findOne(applicationId);

    if (Meteor.userId() !== application.userId) {
      throw new Meteor.Error('not-allowed', 'You must own this application to change it.');
    }

    return Applications.update(applicationId, {$set: {status: 'submitted',},});
  },

  signApplication: function(applicationId, signatureData) {
    check(applicationId, String);

    var application = Applications.findOne(applicationId);

    if (Meteor.userId() !== application.userId) {
      throw new Meteor.Error('not-allowed', 'You must own this application to change it.');
    }

    return Applications.update(applicationId, {$set: {signature: signatureData, status: 'signed',},});
  },
});