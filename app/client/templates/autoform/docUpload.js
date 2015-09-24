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
    $loader = $hiddenInput.siblings('.preloader-wrapper');

    $loader.addClass('active');

    uploader.send($hiddenInput.siblings('.doc-upload-input')[0].files[0], function (error, downloadUrl) {
      if (error) {
        console.error('Error uploading', error.reason);
        Materialize.toast(TAPi18n.__('alert-error'), 2000);
        Materialize.toast(error.reason, 3000);
      } else {

        $hiddenInput.val(downloadUrl);
        if ($hiddenInput.siblings('.doc-upload-link')[0]) {
          $hiddenInput.siblings('.doc-upload-link').attr('href', downloadUrl);
        } else {
          $hiddenInput.parent().append('<a class="btn-floating blue doc-upload-link" href="' + downloadUrl + '"><i class="material-icons">description</i></a>');
        }
        
        Materialize.toast(TAPi18n.__('alert-upload_success'), 3000);
      }

      $loader.removeClass('active');
    });
  },

  'click .doc-upload-trigger': function(e) {
    e.preventDefault();

    $hiddenInput = $('#' + this.atts.id);
    $fileInput = $hiddenInput.siblings('.doc-upload-input');

    $fileInput.click();
  },
});

