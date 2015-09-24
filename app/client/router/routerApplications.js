Router.map(function() {

  // Applications
  this.route('application', {
    path: '/application',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'applicant')) {

        var userApplication = Applications.findOne({}, {'status': 1, 'extend': 1});

        if (moment().isAfter(Meteor.settings.public.applicationDeadline)) {
        
          // Check if after deadline
          if (userApplication.extend !== true || moment().isAfter(Meteor.settings.public.applicationExtension)) {

            // Get application status and redirect depending on that
            
            if (userApplication.status !== 'paid' || userApplication.status !== 'approved') {
              Router.go('/application-closed');
            }

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
