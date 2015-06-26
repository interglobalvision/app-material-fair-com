var uploader;

Template.docUpload.rendered = function () {
  uploader = new Slingshot.Upload("docUpload");
};

Template.docUpload.events({
  'change #docUpload': function(e) {
    e.preventDefault();

    uploader.send(document.getElementById('docUpload').files[0], function (error, downloadUrl) {
      if (error) {
        // Log service detailed response.
        console.error('Error uploading', uploader.xhr.response);
        Materialize.toast(error, 3000);
      } else {
        console.log(downloadUrl);
        Materialize.toast('Upload successful', 3000);
        $('#docUrl').val(downloadUrl);
      }
    });
  },
});