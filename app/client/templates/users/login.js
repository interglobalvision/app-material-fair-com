Template.login.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();

    Meteor.loginWithPassword(email, password, function(error){
      if (error) {
        // flash(error.reason, 'error');
      } else {
        Router.go('/');
        // flash('You are now logged in.');
      }
    });
  },
};
