Router.map(function() {

  // Pages

  this.route('homepage', {
    path: '/',
  });

  this.route('content');

  // Users

  this.route('login');

  this.route('signup');

  this.route('forgot');

  // Admin
  this.route('dashboard', {
    path: '/admin',
    waitOn: function() {
      return [
        Meteor.subscribe('adminUsers'),
        Meteor.subscribe('committeeUsers'),
        Meteor.subscribe('allApplications'),
      ];
    },

    data: function() {
      return {
        applications: Applications.find(),
        adminUsers: Roles.getUsersInRole('admin'),
        committeeUsers: Roles.getUsersInRole('committee'),
      };
    },
  });

});