Template.forgot.events = {
  'click input[type=submit]': function(e){
    e.preventDefault();

    var options = {
      email: $('#email').val(),
    };

    Accounts.forgotPassword(options, function(error){
      if (error) {
        Materialize.toast(TAPi18n.__('alert-error'), 3000);
        Materialize.toast(error.reason, 3000);
      } else {
        Materialize.toast(TAPi18n.__('alert-reset_sent'), 3000);
        Router.go('/login');
      }
    });
  },
};
