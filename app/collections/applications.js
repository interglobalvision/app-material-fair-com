/* ---------------------------------------------------- +/

## Applications ##

All code related to the Applications collection goes here. 

/+ ---------------------------------------------------- */

Applications = new Meteor.Collection('applications');

// Allow/Deny

Applications.allow({
  insert: function(userId, doc){
    return can.createApplication(userId);
  },

  update: function(userId, doc, fieldNames, modifier){
    return can.editApplication(userId, doc);
  },

  remove: function(userId, doc){
    return can.removeApplication(userId, doc);
  },
});

// Methods

Meteor.methods({
  createApplication: function(application){
    if (Roles.userIsInRole(Meteor.userId(), 'applicant')) {
      Applications.insert(application);
    }else{
      console.log('You do not have permission to createApplication');
      return;
    }
  },

  removeApplication: function(application){
    if (Roles.userIsInRole(Meteor.userId(), ['super','admin',])) {
      Applications.remove(application._id);
    }else{
      console.log('You do not have permission to removeApplication');
      return;
    }
  },

  saveApplication: function(applicationId, userId, applicationUpdate){
    // TODO: Check doc ownder with userId
    if (Roles.userIsInRole(Meteor.userId(), 'applicant')) {
      Applications.update(applicationId, applicationUpdate);
    }else{
      console.log('You do not have permission to createApplication');
      return;
    }
  },
});
