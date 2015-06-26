var uploader;

Template.imageUpload.rendered = function () {
  uploader = new Slingshot.Upload("imageUpload");
};

Template.imageUpload.events({
  'change #imageUpload': function(e) {
    e.preventDefault();

    uploader.send(document.getElementById('imageUpload').files[0], function (error, downloadUrl) {
      if (error) {
        // Log service detailed response.
        console.error('Error uploading', uploader.xhr.response);
        Materialize.toast(error, 3000);
      } else {
        console.log(downloadUrl);
        Materialize.toast('Upload successful', 3000);
        $('#imageUrl').val(downloadUrl);
      }
    });
  },
});