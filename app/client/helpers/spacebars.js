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

// ADMIN

Handlebars.registerHelper('displayUsername', function(userId) {
  var user = Meteor.users.findOne(userId);

  if (user.profile.name) {
    return user.profile.name;
  } else {
    return user.emails[0].address;
  }
});

  // COMMENTS

Handlebars.registerHelper('formatCommentTimestamp', function(timestamp) {
  var time = moment(timestamp, 'X');

  return time.fromNow();
});

Handlebars.registerHelper('isCommentOwner', function() {
  if (Meteor.userId() === this.userId) {
    return true;
  } else {
    return false;
  }
});
