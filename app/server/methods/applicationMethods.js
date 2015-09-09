// Methods
Meteor.methods({
  createApplication: function(application) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-signed-in', 'You must register a user first before creating an application.');
    }

    return Applications.insert(application);
  },

  saveApplication: function(applicationId, applicationUpdate) {

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-signed-in', 'You must register a user first before creating an application.');
    }

    var application = Applications.findOne(applicationId);

    // Look for falsy values on works and remove them
    if (applicationUpdate.hasOwnProperty('$set') && applicationUpdate.$set.hasOwnProperty('artists')) {

      // Sanitize artists
      applicationUpdate.$set.artists = _.compact( applicationUpdate.$set.artists);
      for (var i = 0; i < applicationUpdate.$set.artists.length; i++) {
        if (applicationUpdate.$set.artists[i].hasOwnProperty('work')) {
          // Sanitize works
          applicationUpdate.$set.artists[i].work = _.compact( applicationUpdate.$set.artists[i].work );
        }
      }
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
