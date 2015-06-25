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