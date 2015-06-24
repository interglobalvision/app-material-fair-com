Template.signup.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();

    var user = {
      email: $('#email').val(),
      password: $('#password').val(),
    };

    if (!user.email || !user.password) {
      Materialize.toast(error.reason, 3000);
    } else {
      Accounts.createUser(user, function(error) {
        if (error) {
          Materialize.toast(error.reason, 3000);
        } else {
          var userId = Meteor.userId();

          Meteor.call('createUserRoles', userId, function(error, result) {
            if (error) {
              Materialize.toast(error, 3000);
            } else if (result === 'applicant') {
              Meteor.call('createApplication', {userId: userId, status: 'saved',}, function(error, result) {
                if (error) {
                  Materialize.toast(error, 3000);
                } else {
                  Materialize.toast('Thanks for registering.', 2000);
                  Materialize.toast('Please fill out the application.', 3500);
                  Router.go('/application');
                }
              });
            } else if (result === 'admin') {
              Materialize.toast('Welcome to the admin dashboard.', 3000);
              Router.go('/admin');
            } else {
              Router.go('/');
            }
          });
        }
      });
    }
  },
};
