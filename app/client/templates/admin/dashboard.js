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
			profile: {
				name: $('#name').val(),
			},
		},
    role = $('input[name="role"]:checked').val();

		if (!user.email || !role || !user.profile.name) {
			Materialize.toast(TAPi18n.__('alert-please_fill'), 3000);
		} else {
			Meteor.call('adminCreateUser', user, function(error, result) {
				if (error) {
          Materialize.toast(TAPi18n.__('alert-error'), 2000);
          Materialize.toast(error.reason, 3000);
				} else {
					var userId = result;

					Meteor.call('createUserRoles', userId, role, function(error, result) {
						if (error) {
              Materialize.toast(TAPi18n.__('alert-error'), 2000);
              Materialize.toast(error.reason, 3000);
						} else {
							Meteor.call('adminEnrollmentEmail', userId, function(error, result) {
								if (error) {
                  Materialize.toast(TAPi18n.__('alert-error'), 2000);
                  Materialize.toast(error.reason, 3000);
								} else {
                  Materialize.toast(TAPi18n.__('alert-enroll_sent'), 2000);
									console.log(result);

                  // Clean form
                  $('#email').val('');
                  $('#name').val('');
                  $('input[name="role"]:checked').prop( "checked", false );
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
