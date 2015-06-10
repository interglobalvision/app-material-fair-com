AutoForm.hooks({
 insertApplicationForm: {
   onSuccess: function(insertDoc, updateDoc, currentDoc) {
     // Sets "submitted" as true
     Meteor.call('saveApplication', this.docId, {$set: {submitted: true,},}, function(error, response) {
       if (error) {
         console.log(error);
       } else {
         Materialize.toast('Application submitted', 4000);
       }
     });
   },
 },
});
