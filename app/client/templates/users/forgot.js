Template.forgot.events = {
  'click input[type=submit]': function(e){
    e.preventDefault();

    var options = {
      email: $('#email').val(),
    };

    Accounts.forgotPassword(options, function(error){
      if (error) {
        Materialize.toast(error.reason, 3000);
      } else {
        Materialize.toast('Password reset link sent!', 3000);
        Router.go('/login');
      }
    });
  },
};
