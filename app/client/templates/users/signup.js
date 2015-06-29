Template.signup.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();

    var user = {
      email: $('#email').val(),
      password: $('#password').val(),
      profile: {lang: '',},
    };

    if (TAPi18n.getLanguage()) {
      user.profile.lang = TAPi18n.getLanguage();
    } else {
      user.profile.lang = 'en';
    }

    if (!user.email || !user.password) {
      Materialize.toast('Empty email or password', 3000);
    } else {

      Accounts.createUser(user, function(error) {
        if (error) {
          Materialize.toast(error.reason, 2000);
        } else {
          var userId = Meteor.userId();

          Meteor.call('setupUser', userId, function(error) {
            if (error) {
              Materialize.toast('Something went wrong.', 2000);
              console.log(error);
            } else if (Roles.userIsInRole(userId, 'admin')) {
              Materialize.toast('Welcome to the admin dashboard.', 3000);
              Router.go('/admin');
            } else if (Roles.userIsInRole(userId, 'applicant')) {
              Materialize.toast('Thanks for registering.', 2000);
              Materialize.toast('Please fill out the application.', 3500);
                Router.go('/application');
            } else {
              Router.go('/');
            }
          });
        }
      });

    }
  },
};
