Template.submitted.onCreated( function() {
  //
});

Template.submitted.helpers({
  galleryHistory: function() {
    return this.galleryHistory.split("\n");
  },
  artistsRepresented: function() {
    return this.artistsRepresented.split("\n");
  },
  standProposal: function() {
    return this.standProposal.split("\n");
  },
});

Template.submitted.rendered = function () {
  $(window).scrollTop( 0 );

  var boothList = $('#booth-list').html(),
    booths = boothList.split(',');

  $('#booth-list').html('');

  $.each(booths, function( index, value ) {
    var string = TAPi18n.__(value);

    $('#booth-list').append('<p>' + string + '</p>');
  });
};

Template.submitted.events({
  'click #reviewSign': function(e) {
    e.preventDefault();

    var signatureValues = AutoForm.getFormValues('signApplication');

    if (AutoForm.validateForm('signApplication')) {

      Meteor.call('signApplication', this._id, signatureValues.updateDoc, function(error, response) {
        if (error) {
          Materialize.toast(error.reason, 3000);
        } else {
          Materialize.toast('Application signed', 3000);
        }
      });

    } else {
      Materialize.toast('Invalid input', 3000);
    }

  },

  'click .edit': function(e) {
    e.preventDefault();

    Meteor.call('revertApplicationToEdit', this._id, function(error, response) {
      if (error) {
        // >>> we need error handling
        console.log(error);
      } else {
        $(window).scrollTop( 0 );
      }
    });

  },

  'click #clearSign': function(e) {
    e.preventDefault();

    signaturePad.clear();
  },
});
