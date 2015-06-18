Template.header.rendered = function () {
	var lang;

	$(".button-collapse").sideNav({
		closeOnClick: true,
	});
	$('#lang-lever').click(function() {
		if ($('#lang').is(':checked')) {
			lang = 'en'; 
		} else {
			lang = 'es'; 
		}

		TAPi18n.setLanguage(lang);

		if (Meteor.userId()) {
			Meteor.call('setUserLanguage', Meteor.userId(), lang, function(error, result) {
				if (error) {
					Materialize.toast(error, 3000);
				} else {
					console.log(getUserLanguage());
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
