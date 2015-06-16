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
        submitted: Applications.find({status: 'submitted'}),
        signed: Applications.find({status: 'signed'}),
        payed: Applications.find({status: 'payed'}),
        approved: Applications.find({status: 'approved'}),
        committeeUsers: Roles.getUsersInRole('committee'),
      };
    },
  });

});