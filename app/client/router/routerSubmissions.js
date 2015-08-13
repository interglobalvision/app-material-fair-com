Router.map(function() {

  this.route('submissions', {
    onBeforeAction: function() {
      var userId = Meteor.userId();

      if (Roles.userIsInRole(userId, 'admin') || Roles.userIsInRole(userId, 'committee')) {
        this.next();
      } else if (Roles.userIsInRole(userId, 'applicant')) {
        Router.go('/application');
      }
    },

    waitOn: function() {
      return [
        Meteor.subscribe('committeeUsers'),
        Meteor.subscribe('allApplications'),
      ];
    },

    data: function() {
      return {
        submitted: Applications.find({status: 'submitted',}),
        signed: Applications.find({status: 'signed',}),
        paid: Applications.find({status: 'paid',}),
        approved: Applications.find({status: 'approved',}),
        committeeUsers: Roles.getUsersInRole('committee'),
      };
    },
  });

  this.route('submissionReview', {
    onBeforeAction: function() {
      var userId = Meteor.userId();

      if (Roles.userIsInRole(userId, 'admin') || Roles.userIsInRole(userId, 'committee')) {
        this.next();
      } else if (Roles.userIsInRole(userId, 'applicant')) {
        Router.go('/application');
      }
    },

    path: '/submissions/:userId',
    waitOn: function () {
      return [
        Meteor.subscribe('singleApplication', this.params.userId),
        Meteor.subscribe('comments', this.params.userId),
        Meteor.subscribe('ratings', Meteor.userId()),
        Meteor.subscribe('committeeUsers'),
      ];
    },

    data: function() {
      return {
        application: Applications.findOne({userId: this.params.userId,}),
        comments: Comments.find({}, {sort: {timestamp: 1,},}),
        committeeUsers: Roles.getUsersInRole('committee'),
      };
    },
  });

});