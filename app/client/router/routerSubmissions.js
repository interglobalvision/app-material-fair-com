Router.map(function() {

  this.route('submissions', {
    waitOn: function() {
      return [
        Meteor.subscribe('committeeUsers'),
        Meteor.subscribe('allApplications'),
      ];
    },

    data: function() {
      return {
        applications: Applications.find(),
        committeeUsers: Roles.getUsersInRole('committee'),
      };
    },
  });

});