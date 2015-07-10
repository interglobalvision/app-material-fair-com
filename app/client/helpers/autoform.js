AutoForm.setDefaultTemplateForType('afArrayField', 'materialized');

AutoForm.addInputType('signaturePad', {
  template: 'signaturePad',
  valueOut: function() {
    var canvasData = this[0].toDataURL();
    var blankCanvas = document.createElement('canvas');

    blankCanvas.height = this[0].height;
    blankCanvas.width = this[0].width;

    if ( canvasData === blankCanvas.toDataURL() ) {
      return '';
    } else {
      return canvasData;
    }
  
  },
});

AutoForm.addInputType('fixedDate', {
  template: 'fixedDate',
  valueOut: function() {
    var value = this.val();

    return value;
  },
});

AutoForm.addInputType('docUpload', {
  template: 'docUpload',
  valueOut: function() {
    var docUrl = this.val();

    return docUrl;
  },
});

AutoForm.addInputType('imageUpload', {
  template: 'imageUpload',
  valueOut: function() {
    var imageUrl = this.val();

    return imageUrl;
  },
});

AutoForm.addInputType('igvCheckboxGroup', {
  template: 'igvCheckboxGroup',
  valueOut: function () {

    var output = $(this).find('input').map(function(index, item) {

      if ($(item).prop('checked')) {
        return $(item).val();
      }

    }).get().join();

    console.log(output);

    return output;
  },
});

AutoForm.addInputType('materializedCheckbox', {
  template: 'checkbox_materialized',
  valueOut: function () {
    return this.prop('checked');
  },
});

AutoForm.hooks({
  insertApplicationForm: {
    onSuccess: function(insertDoc, updateDoc, currentDoc) {
      Meteor.call('submitApplication', this.docId, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          Materialize.toast('Application submitted', 3000);
        }
      });
    },
  },
});
