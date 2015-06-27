/* ---------------------------------------------------- +/

## Handlebars Helpers ##

Custom Handlebars helpers.

/+ ---------------------------------------------------- */

Handlebars.registerHelper('isAdmin', function(){
  if (Roles.userIsInRole(Meteor.userId(), ['admin',])) {
    return true;
  } else {
    return false;
  }
});

Handlebars.registerHelper('isLoggedIn', function(){
  if (Meteor.userId()) {
    return true;
  } else {
    return false;
  }
});
