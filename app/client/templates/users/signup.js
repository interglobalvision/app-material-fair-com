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
      Materialize.toast(TAPi18n.__('alert-please_fill'), 3000);
    } else {

      Accounts.createUser(user, function(error) {
        if (error) {
          Materialize.toast(TAPi18n.__('alert-error'), 2000);
          Materialize.toast(error.reason, 3000);
        } else {
          var userId = Meteor.userId();

          Meteor.call('setupUser', userId, function(error) {
            if (error) {
              Materialize.toast(TAPi18n.__('alert-error'), 2000);
              console.log(error);
            } else if (Roles.userIsInRole(userId, 'admin')) {
              Materialize.toast(TAPi18n.__('alert-signup_admin'), 3000);
              Router.go('/admin');
            } else if (Roles.userIsInRole(userId, 'applicant')) {
              Materialize.toast(TAPi18n.__('alert-signup_applicant-thanks'), 2000);
              Materialize.toast(TAPi18n.__('alert-signup_applicant-please'), 3500);
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
