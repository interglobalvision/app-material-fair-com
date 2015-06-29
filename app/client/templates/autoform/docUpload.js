var uploader,
$hiddenInput,
$fileInput;

Template.docUpload.rendered = function () {
  uploader = new Slingshot.Upload('docUpload');
};

Template.docUpload.events({
  'change .doc-upload-input': function(e) {
    e.preventDefault();

    $hiddenInput = $('#' + this.atts.id);
    $fileInput = $hiddenInput.siblings('.doc-upload-input');

    uploader.send($hiddenInput.siblings('.doc-upload-input')[0].files[0], function (error, downloadUrl) {
      if (error) {
        $filenameInput.html('');
        console.error('Error uploading', uploader.xhr.response);
        Materialize.toast(error, 3000);
      } else {
        $hiddenInput.val(downloadUrl);
        $hiddenInput.parent().append('<a target="_blank" class="btn doc-upload-link" href="' + downloadUrl + '">Cv file</a>');
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