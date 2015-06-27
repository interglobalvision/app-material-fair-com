var uploader,
filename,
$hiddenInput,
$filenameInput,
$fileInput;

Template.imageUpload.rendered = function () {
  uploader = new Slingshot.Upload("imageUpload");
};

Template.imageUpload.events({
  'change .image-upload-input': function(e) {
    e.preventDefault();

    $hiddenInput = $('#' + this.atts.id);
    $fileInput = $hiddenInput.siblings('.image-upload-input');
    $filenameInput = $hiddenInput.siblings('.image-upload-filename');
    filename = $fileInput.val().split('\\').pop();
    $filenameInput.html(filename);

    uploader.send($hiddenInput.siblings('.image-upload-input')[0].files[0], function (error, downloadUrl) {
      if (error) {
        $filenameInput.html('');
        console.error('Error uploading', uploader.xhr.response);
        Materialize.toast(error, 3000);
      } else {
        $hiddenInput.val(downloadUrl);
        Materialize.toast('Upload successful', 3000);
      }
    });
  },

  'click .image-upload-trigger': function(e) {
    e.preventDefault();

    $hiddenInput = $('#' + this.atts.id);
    $fileInput = $hiddenInput.siblings('.image-upload-input');

    $fileInput.click();
  },
});