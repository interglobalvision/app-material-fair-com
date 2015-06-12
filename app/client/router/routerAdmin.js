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
        applicationsSubmittedCount: Applications.find({status: 'submitted',}).count(),
        applicationsSignedCount: Applications.find({status: 'signed',}).count(),
        applicationsPaidCount: Applications.find({status: 'paid',}).count(),
        adminUsers: Roles.getUsersInRole('admin'),
        committeeUsers: Roles.getUsersInRole('committee'),
      };
    },
  });

});
