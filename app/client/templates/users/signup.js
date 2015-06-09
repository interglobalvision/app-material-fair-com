Template.signup.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();

    var user = {
      email: $('#email').val(),
      password: $('#password').val(),
    };

    if (!user.email || !user.password) {
      // flash('Please fill in all fields');
    } else {
      Accounts.createUser(user, function(error) {
        if (error) {
          console.log(error.reason);
          // flash(error.reason, 'error');
        } else {
          var userId = Meteor.userId();

          Meteor.call('createUserRoles', userId, function(error, result) {
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
};
