AutoForm.setDefaultTemplateForType('afArrayField', 'materialized');

AutoForm.addInputType('signaturePad', {
  template: 'signaturePad',
  valueOut: function() {
    var canvasData = this[0].toDataURL();

    return canvasData;
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

AutoForm.addInputType('materializedCheckbox', {
  template: 'checkbox_materialized',
  valueIsArray: true,
  valueOut: function () {
    var val = this.val();

    return val;
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