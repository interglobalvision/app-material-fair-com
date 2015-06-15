Template.saved.onCreated( function() {
  //
});

Template.saved.helpers({
  //
});

Template.saved.rendered = function () {
  //
};

Template.saved.events({
  'click #saveApplication': function(e) {
    e.preventDefault();

    // Show loading bar
    document.querySelector('.progress').style.opacity = 1;

    // Get form values
    var applicationValues = AutoForm.getFormValues('insertApplicationForm');

    // Update values
    Meteor.call('saveApplication', this._id, applicationValues.updateDoc, function(error, response) {
      if (error) {
        // >>> we need error handling
        console.log(error);
      } else {
        Materialize.toast('Application saved', 4000);
      }
    });

    // Hide loading bar
    document.querySelector('.progress').style.opacity = 0;

  },
});