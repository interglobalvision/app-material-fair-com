var uploader;

Template.docUpload.rendered = function () {
  uploader = new Slingshot.Upload('docUpload');
};

Template.docUpload.events({
  'change .doc-upload-input': function(e) {
    e.preventDefault();

    var $hiddenInput = $('#' + this.atts.id);

    uploader.send($hiddenInput.siblings('.doc-upload-input')[0].files[0], function (error, downloadUrl) {
      if (error) {
        console.error('Error uploading', uploader.xhr.response);
        Materialize.toast(error, 3000);
      } else {
        $hiddenInput.val(downloadUrl);
        Materialize.toast('Upload successful', 3000);
      }
    });
  },
});