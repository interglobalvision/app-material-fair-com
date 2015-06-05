Meteor.methods({
  // User methods
  createUserRoles: function(userId) {
    var role;
    
    if (Meteor.users.find().count() === 1) {
      console.log('super');
      Roles.addUsersToRoles(userId, ['super',]);
      role = 'super';
    }else{
      console.log('applicant');
      Roles.addUsersToRoles(userId, ['applicant',]);
      role = 'applicant';
    }

    return role;
  },
}); 
