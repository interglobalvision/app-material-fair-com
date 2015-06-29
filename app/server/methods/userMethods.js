Meteor.methods({

  setupUser: function(userId) {
    check(userId, String);

    Meteor.call('createUserRoles', userId, function(error, result) {
      if (error) {
        throw new Meteor.Error('set-role-failed', error);
      } else if (result === 'applicant') {

        Meteor.call('createApplication', {userId: userId, status: 'saved',}, function(error, result) {
          if (error) {
            throw new Meteor.Error('application-creation-failed', error);
          } else {

            Meteor.call('applicantEnrollmentEmail', userId);

            return true;
          }
        });
      } else {
        return true;
      }
    });
  },

  createUserRoles: function(userId, role) {
    check(userId, String);

    var result;

    if (Meteor.users.find().count() === 1) {
      Roles.addUsersToRoles(userId, ['admin',]);
      Meteor.users.update(userId, {$set:{'profile.name':'Admin',},});
      result = 'admin';
    } else if (role === 'committee' || role === 'admin' && Roles.userIsInRole(Meteor.userId(), ['admin',])) {
      Roles.addUsersToRoles(userId, [role,]);
      result = role;
    } else {
      Roles.addUsersToRoles(userId, ['applicant',]);
      result = 'applicant';
    }

    return result;
  },

  adminCreateUser: function(user) {
//     check(userId, String);

    var result;

    if (Roles.userIsInRole(Meteor.userId(), ['admin',])) {
      result = Accounts.createUser(user);
    } else {
      result = false;
    }

    return result;
  },

  removeUser: function(userId) {
    check(userId, String);

    var result;

    if (Roles.userIsInRole(Meteor.userId(), ['admin',])) {
      result = Meteor.users.remove({_id: userId,});
    } else {
      result = false;
    }

    return result;
  },

  setUserLanguage: function(userId, lang) {
    check(userId, String);
    check(lang, String);

    return Meteor.users.update(userId, {$set: {'profile.lang': lang,},});
  },

});
