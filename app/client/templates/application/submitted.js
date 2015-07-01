Template.submitted.onCreated( function() {
  //
});

Template.submitted.helpers({
  //
});

Template.submitted.rendered = function () {
  $(window).scrollTop( 0 );
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
