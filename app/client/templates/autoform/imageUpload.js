var uploader;

Template.imageUpload.rendered = function () {
  uploader = new Slingshot.Upload("imageUpload");
};

Template.imageUpload.events({
  'change .image-upload-input': function(e) {
    e.preventDefault();

    var $hiddenInput = $('#' + this.atts.id);

    uploader.send($hiddenInput.siblings('.image-upload-input')[0].files[0], function (error, downloadUrl) {
      if (error) {
        // Log service detailed response.
        console.error('Error uploading', uploader.xhr.response);
        Materialize.toast(error, 3000);
      } else {
        $hiddenInput.val(downloadUrl);
        Materialize.toast('Upload successful', 3000);
      }
    });
  },
});