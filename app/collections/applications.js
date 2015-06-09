/* ---------------------------------------------------- +/

## Applications ##

All code related to the Applications collection goes here. 

/+ ---------------------------------------------------- */

Applications = new Meteor.Collection('applications');

// Allow/Deny

Applications.allow({
  insert: function(userId, doc){
    return Roles.userIsInRole(userId, 'applicant');
  },

  update: function(userId, doc, fieldNames, modifier){
    if (Roles.userIsInRole(userId, 'applicant') && doc.userId === userId) { 
      return true;
    } else { 
      return false;
    }
  },

  remove: function(userId, doc){
    if (Roles.userIsInRole(userId, 'applicant') && doc.userId === userId) { 
      return true;
    } else { 
      return false;
    }
  },
});

// Methods

Meteor.methods({
  createApplication: function(application){
    Applications.insert(application);
  },

  removeApplication: function(application){
    Applications.remove(application._id);
  },

  saveApplication: function(applicationId, userId, applicationUpdate){
    Applications.update(applicationId, applicationUpdate);
  },
});
