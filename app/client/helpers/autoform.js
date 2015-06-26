AutoForm.setDefaultTemplateForType('afArrayField', 'materialized');

AutoForm.addInputType('signaturePad', {
	template: 'signaturePad',
	valueOut: function() {
		var canvasData = $('canvas#signature-pad').toDataURL();

		return canvasData;
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