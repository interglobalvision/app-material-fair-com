AutoForm.setDefaultTemplateForType('afArrayField', 'materialized');

AutoForm.hooks({
 insertApplicationForm: {
   onSuccess: function(insertDoc, updateDoc, currentDoc) {
     Meteor.call('submitApplication', this.docId, function(error, response) {
       if (error) {
         console.log(error);
       } else {
         Materialize.toast('Application submitted', 30-00);
       }
     });
   },
 },
});