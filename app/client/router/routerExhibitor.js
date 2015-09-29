Router.map(function() {

  // Exhibitor
  this.route('exhibitor', {
    path: '/exhibitor',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'exhibitor') && moment().isAfter(Meteor.settings.public.applicationDeadline)) {
        this.next();
      } else {
        Router.go('/');
      }
    },
  });

  this.route('exhibitorGeneral', {
    path: '/exhibitor/general',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'exhibitor') && moment().isAfter(Meteor.settings.public.applicationDeadline)) {
        this.next();
      } else {
        Router.go('/');
      }
    },
  });

  this.route('exhibitorBadges', {
    path: '/exhibitor/badges',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'exhibitor') && moment().isAfter(Meteor.settings.public.applicationDeadline)) {
        this.next();
      } else {
        Router.go('/');
      }
    },
  });

  this.route('exhibitorVip', {
    path: '/exhibitor/vip',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'exhibitor') && moment().isAfter(Meteor.settings.public.applicationDeadline)) {
        this.next();
      } else {
        Router.go('/');
      }
    },
  });

  this.route('exhibitorEvents', {
    path: '/exhibitor/events',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'exhibitor') && moment().isAfter(Meteor.settings.public.applicationDeadline)) {
        this.next();
      } else {
        Router.go('/');
      }
    },
  });

  this.route('exhibitorFloorplan', {
    path: '/exhibitor/floorplan',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'exhibitor') && moment().isAfter(Meteor.settings.public.applicationDeadline)) {
        this.next();
      } else {
        Router.go('/');
      }
    },
  });

  this.route('exhibitorTransport', {
    path: '/exhibitor/transport',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'exhibitor') && moment().isAfter(Meteor.settings.public.applicationDeadline)) {
        this.next();
      } else {
        Router.go('/');
      }
    },
  });

  this.route('exhibitorGuide', {
    path: '/exhibitor/guide',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'exhibitor') && moment().isAfter(Meteor.settings.public.applicationDeadline)) {
        this.next();
      } else {
        Router.go('/');
      }
    },
  });

  this.route('exhibitorLogo', {
    path: '/exhibitor/logo',
    onBeforeAction: function() {
      var userId = Meteor.userId();
      
      if (Roles.userIsInRole(userId, 'exhibitor') && moment().isAfter(Meteor.settings.public.applicationDeadline)) {
        this.next();
      } else {
        Router.go('/');
      }
    },
  });

});
