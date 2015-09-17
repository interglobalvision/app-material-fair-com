Template.users.created = function () {
  //
};

Template.users.helpers({
	galleryName: function() {
    var application = Applications.findOne({userId: this._id}, {galleryName: 1});
    return application.galleryName;
  },
  contactEmail: function() {
    var application = Applications.findOne({userId: this._id}, {contactEmail: 1});
    return application.contactEmail;
  },
  extended: function() {
    var application = Applications.findOne({userId: this._id}, {extend: 1});
    return application.extend;
  },
});

Template.users.rendered = function () {
  var _this = this;

  _this.$('.js-sortable').tablesorter();
};

Template.users.events({
  'click .extend': function(event){
    event.preventDefault();

    var applicationUserId = this._id,
    userId = Meteor.userId();

    if (Roles.userIsInRole(userId, 'admin')) {
      Meteor.call('extendApplication', applicationUserId, function(error, result) {
        if (error) {
          alert(error);
        } else {
          Materialize.toast('Application extended', 3000);
        }
      });
    } else {
      Materialize.toast("You don't have permission", 3000);
      Router.go('/');
    }
  },

  'click .unextend': function(event){
    event.preventDefault();

    var applicationUserId = this._id,
    userId = Meteor.userId();

    if (Roles.userIsInRole(userId, 'admin')) {
      Meteor.call('unextendApplication', applicationUserId, function(error, result) {
        if (error) {
          alert(error);
        } else {
          Materialize.toast('Application unextended', 3000);
        }
      });
    } else {
      Materialize.toast("You don't have permission", 3000);
      Router.go('/');
    }
  },
});
