Template.signup.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();

    var user = {
      email: $('#email').val(),
      password: $('#password').val(),
    };

    if(!user.email || !user.password){
      // flash('Please fill in all fields');
    } else {
      Accounts.createUser(user, function(error){
        if (error) {
          console.log(error.reason);
          // flash(error.reason, 'error');
        } else {
          Meteor.call('createUserRoles', Meteor.userId(), function(error, result) {
            if (error) {
              console.log(error);
            } else {
              Meteor.call('createApplication', {userId: Meteor.userId(),}, function(error, result) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('creates an application for u');
                  Router.go('/');
                  console.log('Thanks for signing up!');
                  // flash('Thanks for signing up!');
                }
              });
            }
          });
        }
      });
    }
  },
};
