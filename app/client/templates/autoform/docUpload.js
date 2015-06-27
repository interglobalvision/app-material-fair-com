var uploader,
filename,
$hiddenInput,
$filenameInput,
$fileInput;

Template.docUpload.rendered = function () {
  uploader = new Slingshot.Upload('docUpload');
};

Template.docUpload.events({
  'change .doc-upload-input': function(e) {
    e.preventDefault();

    $hiddenInput = $('#' + this.atts.id);
    $fileInput = $hiddenInput.siblings('.doc-upload-input');
    $filenameInput = $hiddenInput.siblings('.doc-upload-filename');
    filename = $fileInput.val().split('\\').pop();
    $filenameInput.html(filename);

    uploader.send($hiddenInput.siblings('.doc-upload-input')[0].files[0], function (error, downloadUrl) {
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

  'click .doc-upload-trigger': function(e) {
    e.preventDefault();

    $hiddenInput = $('#' + this.atts.id);
    $fileInput = $hiddenInput.siblings('.doc-upload-input');

    $fileInput.click();
  },
});