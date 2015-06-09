Template.application.created = function () {
};

Template.application.helpers({
});

Template.application.rendered = function () {
  //
};

Template.application.events({
  'click button#saveApplication': function(e) {
    e.preventDefault();
    
    // Show loading bar
    document.querySelector('.progress').style.opacity = 1;

    // Get form values
    var applicationValues = AutoForm.getFormValues('insertApplicationForm');

    // Update values
    Meteor.call('saveApplication', this._id, Meteor.userId(), applicationValues.updateDoc, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        Materialize.toast('Application saved', 4000);
      }
    });

    // Hide loading bar
    document.querySelector('.progress').style.opacity = 0;

  },
});

