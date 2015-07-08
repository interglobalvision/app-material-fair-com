var uploader,
$hiddenInput,
$fileInput,
$thumbnail;

Template.imageUpload.rendered = function () {
  uploader = new Slingshot.Upload("imageUpload");

  Tracker.autorun(function () {
    $('.image-upload-thumbnail[src=""]').hide();
  });
};

Template.imageUpload.events({
  'change .image-upload-input': function(e) {
    e.preventDefault();

    $hiddenInput = $('#' + this.atts.id);
    $fileInput = $hiddenInput.siblings('.image-upload-input');
    $thumbnail = $hiddenInput.siblings('.image-upload-thumbnail');

    uploader.send($hiddenInput.siblings('.image-upload-input')[0].files[0], function (error, downloadUrl) {
      if (error) {
        $filenameInput.html('');
        console.error('Error uploading', uploader.xhr.response);
        Materialize.toast(TAPi18n.__('alert-error'), 3000);
        Materialize.toast(error.reason, 3000);
      } else {
        $hiddenInput.val(downloadUrl);
        $thumbnail.attr('src', downloadUrl).show();
        Materialize.toast(TAPi18n.__('alert-upload_success'), 3000);
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