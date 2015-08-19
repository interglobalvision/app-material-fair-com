Handlebars.registerHelper('hasUserRated', function(applicationId) {
  if (Ratings.findOne({userId: Meteor.userId(), applicationId: applicationId,})) {
    return true;
  } else {
    return false;
  }
});

Handlebars.registerHelper('hasUserNotRated', function(applicationId) {
  if (Ratings.findOne({userId: Meteor.userId(), applicationId: applicationId,})) {
    return false;
  } else {
    return true;
  }
});

Handlebars.registerHelper('userRating', function(applicationId) {
  var userRating = Ratings.findOne({userId: Meteor.userId(), applicationId: applicationId,});

  if (userRating) {
    return userRating.rating;
  } else {
    return false;
  }
});