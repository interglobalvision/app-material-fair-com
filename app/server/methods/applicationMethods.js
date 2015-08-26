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

    Applications.update(applicationId, {$set: {status: 'signed',},});
    
    return Applications.update(applicationId, signatureData);
  },

  markApplicationPaid: function(applicationId) {
    check(applicationId, String);

    if (Roles.userIsInRole(Meteor.userId(), ['admin',])) {
      return Applications.update(applicationId, {$set: {status: 'paid',},});
    } else {
      throw new Meteor.Error('not-allowed', 'Bitch you aint got nooooooooo juice ');
    }

  },

  markWaitlist: function(applicationId) {
    check(applicationId, String);

    if (Roles.userIsInRole(Meteor.userId(), ['admin',])) {
      return Applications.update(applicationId, {$set: {waitlist: true,},});
    } else {
      throw new Meteor.Error('not-allowed', 'Bitch you aint got nooooooooo juice ');
    }

  },

  markApproved: function(applicationId) {
    check(applicationId, String);

    if (Roles.userIsInRole(Meteor.userId(), ['admin',])) {
      return Applications.update(applicationId, {$set: {status: 'approved',},});
    } else {
      throw new Meteor.Error('not-allowed', 'Bitch you aint got nooooooooo juice ');
    }

  },

  removeApplication: function(userId) {
    check(userId, String);

    var result;

    if (Roles.userIsInRole(Meteor.userId(), ['admin',])) {
      result = Applications.remove({userId: userId,});
    } else {
      result = false;
    }

    return result;
  },
});