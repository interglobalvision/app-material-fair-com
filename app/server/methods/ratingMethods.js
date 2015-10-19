Meteor.methods({
  rateApplication: function(ratingNumber, applicationId) {
    check(ratingNumber, Number);
    check(applicationId, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error('error-not-signed-in', 'You must sign in first.');
    }

    var existingRating = Ratings.findOne({userId: Meteor.userId(), applicationId: applicationId,});
    var rating = {
      userId: Meteor.userId(),
      applicationId: applicationId,
      // timestamp as unix timestamp. parse back to moment easily
      timestamp: moment().format('X'),
      rating: ratingNumber,
    };
    var result;

    if (existingRating) {

      if( existingRating.rating === ratingNumber ) {
        rating.rating = 0;
      } 
      
      result = Ratings.update(existingRating._id, rating);

      if (result) {
        Meteor.call('updateApplicationRating', applicationId);
        return true;
      } else {
        throw new Meteor.Error('error-rating-update-failed', 'Updating your rating failed.');
      }

    } else {

      result = Ratings.insert(rating);

      if (result) {
        Meteor.call('updateApplicationRating', applicationId);
        return true;
      } else {
        throw new Meteor.Error('error-rating-failed', 'Adding your rating failed.');
      }

    }
  },

  updateApplicationRating: function(applicationId) {
    check(applicationId, String);

    var ratings = Ratings.find({applicationId: applicationId,});
    var ratingValue = 0;
    var ratingsLength = ratings.count();

    // add total of all ratings
    ratings.forEach(function(rating, index) {

      ratingValue += rating.rating;

    });

    // calc average
    ratingValue = (ratingValue / ratingsLength);

    return Applications.update(applicationId, {$set: {rating: ratingValue,},});
  },
});
