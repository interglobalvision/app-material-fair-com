Template.header.helpers({
  isLoggedIn: function () {
    return !!Meteor.user();
  },
});

Template.header.events({
  'click .log-out': function () {
    Meteor.logout();
  },
});
