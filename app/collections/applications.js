/* ---------------------------------------------------- +/

## Applications ##

All code related to the Applications collection goes here.

/+ ---------------------------------------------------- */

Applications = new Meteor.Collection('applications');

// Allow/Deny
// >>> this should only be declared on the server. Currently I think this is declared on the client too.
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
// >> why are these methods here?!
// >>> should be in some kind of /methods folder && this is clients side too no?
Meteor.methods({
  createApplication: function(application){
    Applications.insert(application);
  },

  removeApplication: function(application){
    Applications.remove(application._id);
  },

  saveApplication: function(applicationId, applicationUpdate){
    Applications.update(applicationId, applicationUpdate);
  },
});
