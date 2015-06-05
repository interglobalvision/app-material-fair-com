Meteor.methods({
  // User methods
  createUserRoles: function(userId) {
    if (Meteor.users.find().count() === 1) {
      console.log('super');
      Roles.addUsersToRoles(userId, ['super',]);
    } else {
      console.log('applicant');
      Roles.addUsersToRoles(userId, ['applicant',]);
      Meteor.call('createApplication', {userId: userId,}, function(error, result) {
        if (error) {
          console.log(error);
        }else{
          console.log('application created');
        }
      });
    }
  },
}); 
