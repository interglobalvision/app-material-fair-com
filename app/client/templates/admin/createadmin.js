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
	'click input[type=submit]': function(event){
    event.preventDefault();

    var user = {
      email: $('#email').val(),
      role: $('#role').val(),
    };

    if (!user.email || !user.role) {
      // flash('Please fill in all fields');
    } else {
      Accounts.createUser(user, function(error){
        if (error) {
          console.log(error.reason);
          // flash(error.reason, 'error');
        } else {
          var userId = Meteor.userId();

          Meteor.call('createUserRoles', userId, role, function(error, result) {
            console.log(result);
            if (error) {
              console.log(error);
            } else if (result === 'applicant') {
              Meteor.call('createApplication', {userId: userId,}, function(error, result) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('application created');
                  console.log('Thanks for signing up!');
                  // flash('Thanks for signing up!');
                  Router.go('/application');
                }
              });
            } else {
              Router.go('/');
            }
          });
        }
      });
    }
  },
});