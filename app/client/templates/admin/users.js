Template.users.created = function () {
  //
};

Template.users.helpers({
	galleryName: function() {
    var application = Applications.findOne({userId: this._id}, {galleryName: 1});
    return application.galleryName;
  },
  galleryEmail: function() {
    var application = Applications.findOne({userId: this._id}, {galleryEmail: 1});
    return application.galleryEmail;
  },
});

Template.users.rendered = function () {
  //
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
          Materialize.toast('Application Extended', 3000);
        }
      });
		} else {
			Materialize.toast("You don't have permission", 3000);
			Router.go('/');
		}
	},
});
