Meteor.methods({
  // User methods
  createUserRoles: function(userId, role) {
    var result;
    
    if (Meteor.users.find().count() === 1) {
      console.log('super');
      Roles.addUsersToRoles(userId, ['super',]);
      result = 'super';
    } else if (role === 'committee' || role === 'admin') {
      console.log(role);
      Roles.addUsersToRoles(userId, [role,]);
      result = role;
    } else {
      console.log('applicant');
      Roles.addUsersToRoles(userId, ['applicant',]);
      result = 'applicant';
    }

    return result;
  },

  adminCreateUser: function(user) {
    var userId = Accounts.createUser(user);
    return userId;
  },

  enrollmentEmail: function(userId) {
    Accounts.sendEnrollmentEmail(userId);
    return 'success';
  }
}); 
