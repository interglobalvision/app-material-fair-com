Router.map(function() {

  this.route('dashboard', {
    path: '/admin',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'admin')) {
        this.next();
      } else if (Roles.userIsInRole(userId, 'committee')) {
        Router.go('/submissions');
      } else if (Roles.userIsInRole(userId, 'applicant')) {
        Router.go('/application');
      }
    },

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
        applicationsApprovedCount: Applications.find({status: 'approved',}).count(),
        adminUsers: Roles.getUsersInRole('admin'),
        committeeUsers: Roles.getUsersInRole('committee'),
      };
    },
  });

  this.route('userRemove', {
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'admin')) {
        this.next();
      } else {
        Router.go('/');
      }
    },

    waitOn: function() {
      return [
        Meteor.subscribe('allUsers'),
      ];
    },

    data: function() {
      return {
        users: Meteor.users.find(),
      };
    },
  });

});
