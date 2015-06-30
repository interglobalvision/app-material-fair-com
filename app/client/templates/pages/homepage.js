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
  'click .continue': function(event) {
    event.preventDefault();

    var lang = $(event.target).attr('data-lang');

    if (lang === 'es') {
      $('.language').prop('checked', true);
    } else {
      $('.language').prop('checked', false);
    }

    if (!Meteor.userId()) {
      TAPi18n.setLanguage(lang).done(function () {
        if (lang === 'es') {
          $('.language').prop('checked', true);
        }

        Router.go('/welcome');
      }).fail(function (error) {
        console.log(error);
      });
    } else {
      var userId = Meteor.userId();

      TAPi18n.setLanguage(lang).done(function () {
        if (Roles.userIsInRole(userId, 'applicant')) {
          Router.go('/application');
        } else if (Roles.userIsInRole(userId, 'committee') && !Roles.userIsInRole(userId, 'admin')) {
          Router.go('/submissions');
        } else if (Roles.userIsInRole(userId, 'admin')) {
          Router.go('/admin');
        } 
      }).fail(function (error) {
        console.log(error);
      });
    }
  },
});