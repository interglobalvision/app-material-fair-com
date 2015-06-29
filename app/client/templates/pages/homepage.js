Template.homepage.onCreated( function() {
  //
});

Template.homepage.helpers({
  //
});

Template.homepage.rendered = function () {
  $(window).scrollTop( 0 );
};

Template.homepage.events({
  'click #es-registrar': function() {
    TAPi18n.setLanguage('es').done(function () {
      $('.language').prop('checked', true);
      Router.go('/signup');
    }).fail(function (error) {
      console.log(error);
    });
  },
  'click #es-ingresar': function() {
    TAPi18n.setLanguage('es').done(function () {
      $('.language').prop('checked', true);
      Router.go('/login');
    }).fail(function (error) {
      console.log(error);
    });
  },
  'click #en-register': function() {
    TAPi18n.setLanguage('en').done(function () {
      $('.language').prop('checked', false);
      Router.go('/signup');
    }).fail(function (error) {
      console.log(error);
    });
  },
  'click #en-login': function() {
    TAPi18n.setLanguage('en').done(function () {
      $('.language').prop('checked', false);
      Router.go('/login');
    }).fail(function (error) {
      console.log(error);
    });
  },
});