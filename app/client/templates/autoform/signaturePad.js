Template.signaturePad.rendered = function () {
  var canvas = $('canvas[name="signature"]')[0];

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

  signaturePad = new SignaturePad(canvas);
};