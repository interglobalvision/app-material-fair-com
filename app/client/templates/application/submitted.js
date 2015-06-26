Template.submitted.onCreated( function() {
  //
});

Template.submitted.helpers({
  //
});

Template.submitted.rendered = function () {
  /*var canvas = document.getElementById('signature-pad');

  $(window).scrollTop( 0 );

  function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio = Math.max(window.devicePixelRatio || 1, 1);

    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
  }

  window.onresize = resizeCanvas;

  resizeCanvas();

  signaturePad = new SignaturePad(canvas);*/
};

Template.submitted.events({
  'click #reviewSign': function(e) {
    e.preventDefault();

    var signatureValues = AutoForm.getFormValues('signApplication');

    console.log(signatureValues);

    Meteor.call('signApplication', this._id, signatureValues.updateDoc, function(error, response) {
      if (error) {
        Materialize.toast(error.reason, 3000);
      } else {
        Materialize.toast('Application signed', 3000);
      }
    });

  },

  'click #backToForm': function(e) {
    e.preventDefault();

    Meteor.call('revertApplicationToEdit', this._id, function(error, response) {
      if (error) {
        // >>> we need error handling
        console.log(error);
      } else {
        //$(window).scrollTop( 0 );
      }
    });

  },

  'click #clearSign': function(e) {
    e.preventDefault();

    signaturePad.clear();
  },
});
