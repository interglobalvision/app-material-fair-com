Template.submissionReview.created = function () {
  //
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
};

Template.submissionReview.events({
  'click #submit-add-comment': function(e) {
    var applicationId = $('#application-id').val();
    var comment = AutoForm.getFieldValue('comment', 'add-comment-form');

    e.preventDefault();

    Meteor.call('createComment', applicationId, comment, function(err, result) {
      if (err) {
        console.log(err);
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
  }
});