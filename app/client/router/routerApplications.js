Router.map(function() {

  // Applications
  this.route('application', {
    path: '/application',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'applicant')) {
        
        // Check if after deadline
        if (moment().isAfter(Meteor.settings.public.applicationDeadline)) {

          // Get application status and redirect depending on that
          var userApplication = Applications.findOne({}, {'status': 1,});
        
          if (userApplication.status !== 'paid' || userApplication.status !== 'approved') {
            Router.go('/application-closed');
          }

        }

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

  // Application Closed
  this.route('application-closed', {
    path: '/application-closed',
  });
});
