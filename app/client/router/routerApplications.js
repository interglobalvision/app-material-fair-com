Router.map(function() {

  // Applications
  this.route('application', {
    path: '/application',
    waitOn: function() {
      return Meteor.subscribe('singleApplication', Meteor.userId());
    },

    data: function() {
      return Applications.findOne();
    },
  });

});