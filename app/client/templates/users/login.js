Template.login.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();

    Meteor.loginWithPassword(email, password, function(error){
      if (error) {
        Materialize.toast(error.reason, 3000);
      } else {
        Materialize.toast('You are now logged in.', 3000);
        Router.go('/');
      }
    });
  },
};
