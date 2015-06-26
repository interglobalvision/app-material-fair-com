Router.map(function() {

  // Applications
  this.route('application', {
    path: '/application',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'applicant')) {
        this.next();
      } else if (Roles.userIsInRole(userId, 'committee') && !Roles.userIsInRole(userId, 'admin')) {
        Router.go('/submissions');
      } else if (Roles.userIsInRole(userId, 'admin')) {
        Router.go('/admin');
      }
    },

    waitOn: function() {
      return [   
        Meteor.subscribe('singleApplication', Meteor.userId()),
      ];
    },

    data: function() {
      return Applications.findOne();
    },
  });

});