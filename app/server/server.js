Meteor.startup(function () {

  // PLZ REMOVE ME ONCE USED

  var submissions = Applications.find({rating: { $exists: true,},});

  submissions.forEach(function(application) {
    Meteor.call('updateApplicationRating', application._id);
  });


});