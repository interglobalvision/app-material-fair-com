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
  'click #espanol': function() {
    TAPi18n.setLanguage('es').done(function () {
      $('.language').prop('checked', true);
    }).fail(function (error) {
      console.log(error);
    });
  },

  'click .start': function() {
    if (!Meteor.userId()) {
      Router.go('/signup');
    } else {
      Router.go('/application');
    }
  },
});