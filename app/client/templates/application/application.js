Template.application.created = function () {
};

Template.application.helpers({
  applicationDocId: function() {
  },
});

Template.application.rendered = function () {
  //
};

Template.application.events({
  'click input[value="Save"]': function(e) {
    e.preventDefault();

    // Get form values
    var applicationValues = AutoForm.getFormValues('insertApplicationForm');
    
    console.log(applicationValues);
    
    // Update values
  },
});

