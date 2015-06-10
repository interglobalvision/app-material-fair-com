Router.map(function() {

  this.route('dashboard', {
    path: '/admin',
    waitOn: function() {
      return [
        // >>> should these subscriptions require auth on the sever to check role?
        Meteor.subscribe('adminUsers'),
        Meteor.subscribe('committeeUsers'),
        Meteor.subscribe('allApplications'),
      ];
    },

    data: function() {
      return {
        applications: Applications.find(),
        applicationsCount: Applications.find().count(),
        applicationsSubmittedCount: Applications.find({submitted: true,}).count(),
        applicationsSignedCount: Applications.find({signed: true,}).count(),
        applicationsPaidCount: Applications.find({paid: true,}).count(),
        adminUsers: Roles.getUsersInRole('admin'),
        committeeUsers: Roles.getUsersInRole('committee'),
      };
    },
  });

});