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
    return false;
  },
});

// Methods
Meteor.methods({
  createApplication: function(application){
    Applications.insert(application);
  },

  saveApplication: function(applicationId, applicationUpdate){
    Applications.update(applicationId, applicationUpdate);
  },
});