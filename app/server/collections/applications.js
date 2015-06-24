Applications = new Meteor.Collection('applications');

// Allow/Deny
Applications.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, 'applicant');
  },

  update: function(userId, doc, fieldNames, modifier) {
    if (Roles.userIsInRole(userId, 'applicant') && doc.userId === userId) {
      return true;
    } else {
      return false;
    }
  },

  remove: function(userId, doc){
    return false;
  },
});

Applications.deny({

  update: function(userId, doc, fieldNames, modifier){
    return _.contains(fieldNames, 'status');
  },

});

// Methods
Meteor.methods({
  createApplication: function(application) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-signed-in', 'You must register a user first before creating an application.');
    }

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
    var application = Applications.findOne(applicationId);

    if (Meteor.userId() !== application.userId) {
      throw new Meteor.Error('not-allowed', 'You must own this application to change it.');
    }

    return Applications.update(application._id, {$set: {status: 'saved',},});
  },

  submitApplication: function(applicationId) {
    var application = Applications.findOne(applicationId);

    if (Meteor.userId() !== application.userId) {
      throw new Meteor.Error('not-allowed', 'You must own this application to change it.');
    }

    return Applications.update(applicationId, {$set: {status: 'submitted',},});
  },

  signApplication: function(applicationId, signatureData) {
    var application = Applications.findOne(applicationId);

    if (Meteor.userId() !== application.userId) {
      throw new Meteor.Error('not-allowed', 'You must own this application to change it.');
    }

    return Applications.update(applicationId, {$set: {signature: signatureData, status: 'signed',},});
  },
});