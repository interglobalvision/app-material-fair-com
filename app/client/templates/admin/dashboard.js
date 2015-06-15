Template.dashboard.created = function () {
  //
};

Template.dashboard.helpers({
	//
});

Template.dashboard.rendered = function () {
  //
};

Template.dashboard.events({
  'click #admin-add-user': function(event){
    event.preventDefault();

    var user = {
      email: $('#email').val(),
    },
    role = $('input[name="role"]:checked').val();

		if (!user.email || !role) {
			console.log('Please fill in all fields');
			// flash('Please fill in all fields');
		} else {
			Meteor.call('adminCreateUser', user, function(error, result) {
				if (error) {
          Materialize.toast(error.reason, 3000);
					console.log(error.reason);
				} else {
					var userId = result;

					Meteor.call('createUserRoles', userId, role, function(error, result) {
						if (error) {
              Materialize.toast(error, 3000);
							console.log(error);
						} else {
							console.log('role=' + result);

							Meteor.call('enrollmentEmail', userId, function(error, result) {
								if (error) {
                  Materialize.toast(error, 3000);
									console.log(error);
								} else {
                  Materialize.toast('Enrollment email sent', 3000);
									console.log(result);
									Router.go('/admin');
								}
							});
						}
					});
				}
      });
    }
  },

  'click .remove-user': function(event){
    event.preventDefault();

		var removeUserId = this._id,
		userId = Meteor.userId();

		if (Roles.userIsInRole(userId, 'admin')) {
			Meteor.call('removeUser', removeUserId, function(error, result) {
				if (error) {
					alert(error);
				} else {
					Materialize.toast('User removed', 3000);
				}
			});
		} else {
			Materialize.toast("You don't have permission", 3000);
			Router.go('/');
		}
	},
});