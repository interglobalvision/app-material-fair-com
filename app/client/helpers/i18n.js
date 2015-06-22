Tracker.autorun(function () {
  var userLanguage;

  if (Meteor.user()) {
    userLanguage = Meteor.user().profile.lang;
  } else if (TAPi18n.getLanguage()) {
    userLanguage = TAPi18n.getLanguage();
  } else {
    userLanguage = 'en';
  }

  TAPi18n.setLanguage(userLanguage)
    .done(function () {
      if (userLanguage === 'en') {
        $('.language').prop('checked', false);
      } else if (userLanguage === 'es') {
        $('.language').prop('checked', true);
      }
    })
    .fail(function (error) {
      // Handle the situation
      console.log(error);
    });
});