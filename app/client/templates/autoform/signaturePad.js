Template.signaturePad.rendered = function () {
  var canvas = $('canvas[name="signature"]')[0],
    ctx = canvas.getContext("2d"),
    data = canvas.toDataURL();

  function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio = Math.max(window.devicePixelRatio || 1, 1),
    img = new Image();

    $('#signature-card').css('height', ($('#signature-card').width() * 0.4) );

    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    ctx.scale(ratio, ratio);

    img.onload = function(){
      ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
    };
    
    img.src = data;
  }

  window.onresize = resizeCanvas;

  resizeCanvas();

  canvas.onmouseup = function(e){
    data = canvas.toDataURL();
  };

  signaturePad = new SignaturePad(canvas);
};