Template.userRemove.created = function () {
  //
};

Template.userRemove.helpers({
	//
});

Template.userRemove.rendered = function () {
  //
};

Template.userRemove.events({
  'click .remove-user': function(event){
    event.preventDefault();

		var removeUserId = this._id,
		userId = Meteor.userId();

		if (Roles.userIsInRole(userId, 'admin')) {
      Meteor.call('removeApplication', removeUserId, function(error, result) {
        if (error) {
          alert(error);
        } else {
          Materialize.toast('Application Removed', 3000);
          Meteor.call('removeUser', removeUserId, function(error, result) {
            if (error) {
              alert(error);
            } else {
              Materialize.toast('User Removed', 3000);
            }
          });
        }
      });
		} else {
			Materialize.toast("You don't have permission", 3000);
			Router.go('/');
		}
	},
});
