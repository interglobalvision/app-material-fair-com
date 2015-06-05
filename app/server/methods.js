Meteor.methods({
  // User methods
  onCreateUserAddRole: function(userId) {
    if (Meteor.users.find().count() === 1) {
      console.log('super');
      Roles.addUsersToRoles(userId, ['super']);
    } else {
      console.log('applicant');
      Roles.addUsersToRoles(userId, ['applicant']);
    }
  },
});
