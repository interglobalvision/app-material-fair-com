Accounts.emailTemplates.siteName = "Material Art Fair";
Accounts.emailTemplates.from = "Material Art Fair Admin <accounts@example.com>";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Your Material Art Fair " + user.roles[0] + " account.";
};

Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return "You have a new account on the Material Art Fair application & review." + " To activate your account, simply click the link below:\n\n" + url;
};