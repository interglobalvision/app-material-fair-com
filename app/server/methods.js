Meteor.methods({
  // User methods
  createUserRoles: function(userId, role) {
    var result;
    
    if (Meteor.users.find().count() === 1) {
      Roles.addUsersToRoles(userId, ['admin',]);
      result = 'admin';
    } else if (role === 'committee' || role === 'admin') {
      Roles.addUsersToRoles(userId, [role,]);
      result = role;
    } else {
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
  },

  removeUser: function(userId) {
    Meteor.users.remove({_id: userId,});
  },
}); 
