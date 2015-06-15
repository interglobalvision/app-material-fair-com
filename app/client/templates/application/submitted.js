Template.submitted.onCreated( function() {
  //
});

Template.submitted.helpers({
  //
});

Template.submitted.rendered = function () {
  var canvas = document.getElementById("signature-pad");

  function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio = Math.max(window.devicePixelRatio || 1, 1);
    
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
  }

  window.onresize = resizeCanvas;

  resizeCanvas();

  signaturePad = new SignaturePad(canvas);
};

Template.submitted.events({
  'click #reviewSign': function(e) {
    e.preventDefault();

		if (signaturePad.isEmpty()) {
			Materialize.toast('Please provide signature.', 3000);
		} else {
			var signatureData = signaturePad.toDataURL();

      Meteor.call('saveApplication', this._id, {$set: {signature: signatureData, status: "signed",},}, function(error, response) {
        if (error) {
          // >>> we need error handling
          console.log(error);
        } else {
          Materialize.toast('Application signed', 4000);
        }
      });
		}
  },

  'click #clearSign': function(e) {
    e.preventDefault();

    signaturePad.clear();
  },
});
