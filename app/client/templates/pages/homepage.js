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

  'click #start': function() {
    Router.go('/signup');
  },

  'click #empezar': function() {
    TAPi18n.setLanguage('es').done(function () {$('.language').prop('checked', true);}).fail(function (error) {console.log(error);});
    Router.go('/signup');
  },

  'click #continue': function() {
    Router.go('/application');
  },

});