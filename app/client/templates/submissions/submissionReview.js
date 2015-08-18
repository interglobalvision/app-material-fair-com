Template.submissionReview.created = function () {

};

Template.submissionReview.helpers({
  website: function() {
    var application = Applications.find({}, { fields: {website:1}}).fetch(),
    url = application[0].website.replace(/^https?\:\/\//i, "");

    return 'http://' + url;
  },
  facebook: function() {
    var application = Applications.find({}, { fields: {facebook:1}}).fetch(),
    url = application[0].facebook.replace(/^https?\:\/\//i, "");

    return 'https://' + url;
  },
  tumblr: function() {
    var application = Applications.find({}, { fields: {tumblr:1}}).fetch(),
    url = application[0].tumblr.replace(/^https?\:\/\//i, "");

    return 'https://' + url;
  },
  twitter: function() {
    var application = Applications.find({}, { fields: {twitter:1}}).fetch(),
      handle = application[0].twitter;
    if (handle.charAt(0) == '@') {
      handle = handle.substr(1);
    }
    return handle.toLowerCase();
  },
  instagram: function() {
    var application = Applications.find({}, { fields: {instagram:1}}).fetch(),
      handle = application[0].instagram;
    if (handle.charAt(0) == '@') {
      handle = handle.substr(1);
    }
    return handle.toLowerCase();
  },
});

Template.submissionReview.onRendered(function() {
  var _this = this;

  //>>> this block needs rationalizing to start from a template instance selected jquery object
  var boothList = $('#booth-list').html(),
    booths = boothList.split(',');

  $('#booth-list').html('');

  $.each(booths, function( index, value ) {
    var string = TAPi18n.__(value);

    $('#booth-list').append('<p>' + string + '</p>');
  });

  //highlight users rating value if set
  _this.autorun(function () {
    var userReview = Ratings.findOne({applicationId: _this.data.application._id,});

    if (userReview) {
      $('.js-set-rating').removeClass('darken-4').addClass('darken-2');
      $('li[data-value="' + userReview.rating + '"]').removeClass('darken-2').addClass('darken-4');
    }

  });

  //init materialize popover popover images
  _this.$('.js-materialize-boxed').materialbox();
});

Template.submissionReview.events({
  'click .js-set-rating': function(e) {
    e.preventDefault();

    Meteor.call('rateApplication', parseInt($(e.currentTarget).data('value')), this.application._id, function(err, result) {
      if (err) {
        console.log(err);
      } else {
//         console.log(result);
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