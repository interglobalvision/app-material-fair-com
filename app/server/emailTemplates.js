// >>> think this can be declared as an array
Accounts.emailTemplates.siteName = "Material Art Fair";
Accounts.emailTemplates.from = Meteor.settings.email_from;
Accounts.emailTemplates.enrollAccount.subject = function (user) {
	return "Your Material Art Fair " + user.roles[0] + " account.";
};

Accounts.emailTemplates.enrollAccount.text = function (user, url) {
	return "You have a new account on the Material Art Fair application & review." + " To activate your account, simply click the link below:\n\n" + url;
};