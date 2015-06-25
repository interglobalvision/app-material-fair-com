Meteor.methods({

  setupUser: function(userId) {
    Meteor.call('createUserRoles', userId, function(error, result) {

      console.log('post user role');

      if (error) {
        throw new Meteor.Error('set-role-failed', error);
      } else if (result === 'applicant') {

        console.log('is applicant');

        Meteor.call('serverCreateApplication', {userId: userId, status: 'saved',}, function(error, result) {
          if (error) {
            throw new Meteor.Error('application-creation-failed', error);
          } else {

            console.log('application created');
            console.log(result);

            return true;
          }
        });
      } else {
        return true;
      }
    });
  },

  createUserRoles: function(userId, role) {
    var result;

    if (Meteor.users.find().count() === 1) {
      Roles.addUsersToRoles(userId, ['admin',]);
      Meteor.users.update(userId, {$set:{'profile.name':'Admin',},});
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
    //>>> needs admin role check
    var userId = Accounts.createUser(user);

    return userId;
  },

  enrollmentEmail: function(userId) {
    Accounts.sendEnrollmentEmail(userId);
    return 'success';
  },

  removeUser: function(userId) {
    //>>> needs admin role check
    return Meteor.users.remove({_id: userId,});
  },

  setUserLanguage: function(userId, lang) {
    return Meteor.users.update(userId, {$set: {'profile.lang': lang,},});
  },

});
