/* ---------------------------------------------------- +/

## Handlebars Helpers ##

Custom Handlebars helpers.

/+ ---------------------------------------------------- */

Handlebars.registerHelper('isAdmin', function() {
  if (Roles.userIsInRole(Meteor.userId(), ['admin',])) {
    return true;
  } else {
    return false;
  }
});

Handlebars.registerHelper('isLoggedIn', function() {
  if (Meteor.userId()) {
    return true;
  } else {
    return false;
  }
});

Handlebars.registerHelper('afterDeadline', function() {
  if (moment().isAfter(Meteor.settings.public.applicationDeadline)) {
    return true;
  } else {
    return false;
  }
});

// ADMIN

Handlebars.registerHelper('displayUsername', function(userId) {
  var user = Meteor.users.findOne(userId);

  if (user) {
    if (user.profile.name) {
      return user.profile.name;
    } else {
      return user.emails[0].address;
    }
  }
});