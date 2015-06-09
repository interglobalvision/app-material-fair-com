Template.users.created = function () {
  //
};

Template.users.helpers({
  //
});

Template.users.rendered = function () {
  //
};

Template.users.events({
	'click button[type=submit]': function(event){
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
					console.log(error.reason);
				} else {
					var userId = result;

					Meteor.call('createUserRoles', userId, role, function(error, result) {
						if (error) {
							console.log(error);
						} else {
							console.log('role=' + result);

							Meteor.call('enrollmentEmail', userId, function(error, result) {
								if (error) {
									console.log(error);
								} else {
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
});