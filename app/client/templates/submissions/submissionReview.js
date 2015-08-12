Template.submissionReview.created = function () {

};

Template.submissionReview.helpers({
  //
});

Template.submissionReview.rendered = function () {
  var boothList = $('#booth-list').html(),
    booths = boothList.split(',');

  $('#booth-list').html('');

  $.each(booths, function( index, value ) {
    var string = TAPi18n.__(value);

    $('#booth-list').append('<p>' + string + '</p>');
  });

  Tracker.autorun(function () {

    var application = Applications.findOne();
    var userReview = Ratings.findOne({applicationId: application._id});

    if (userReview) {
      $('.js-set-rating').removeClass('green').addClass('yellow');
      $('li[data-value="' + userReview.rating + '"]').removeClass('yellow').addClass('green');
    }

  });
};

Template.submissionReview.events({
  'click .js-set-rating': function(e) {
    e.preventDefault();

    Meteor.call('rateApplication', parseInt($(e.currentTarget).data('value')), this.application._id, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  },

  'click #submit-add-comment': function(e) {
    var applicationId = $('#application-id').val();
    var comment = AutoForm.getFieldValue('comment', 'add-comment-form');

    e.preventDefault();

    Meteor.call('createComment', applicationId, comment, function(err, result) {
      if (err) {
        console.log(err);
        Materialize.toast(TAPi18n.__(err.error), 3000);
      } else {
        console.log(result);
        AutoForm.resetForm('add-comment-form');
      }
    });
  },

  'click .js-comment-delete': function(e) {
    e.preventDefault();

    Meteor.call('deleteComment', this._id, function(err, result) {
      if (err) {
        console.log(err);
      } else {
//         console.log(result);
      }
    });
  },
});