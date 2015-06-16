Template.header.rendered = function () {
	$(".button-collapse").sideNav({
		closeOnClick: true
	});
	$('#lang-lever').click(function() {
		if($('#lang').is(':checked')) {
			TAPi18n.setLanguage('en');
		} else {
			TAPi18n.setLanguage('es');
		}
	})
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
