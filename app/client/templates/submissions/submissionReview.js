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
  //
});