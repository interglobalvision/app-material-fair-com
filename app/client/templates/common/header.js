Template.header.rendered = function () {
	var lang;

	$('.button-collapse').sideNav({
		closeOnClick: true,
	});
	$('.language-switch').click(function(e) {

		if ($(this).parent().find('input.language').is(':checked')) {
			lang = 'en';
		} else {
			lang = 'es';
		}

		TAPi18n.setLanguage(lang);

		if (Meteor.userId()) {
			Meteor.call('setUserLanguage', Meteor.userId(), lang, function(error, result) {
				if (error) {
					Materialize.toast(error, 3000);
				}
			});
		}
	});
};

Template.header.helpers({
  isLoggedIn: function () {
    return !!Meteor.user();
  },
});

Template.header.events({
  'click .log-out': function () {
    Meteor.logout();
  },
});
