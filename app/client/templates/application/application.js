Template.application.created = function () {
};

Template.application.helpers({
});

Template.application.rendered = function () {
  //
};

Template.application.events({
  'click input[value="Save"]': function(e) {
    e.preventDefault();

    // Get form values
    var applicationValues = AutoForm.getFormValues('insertApplicationForm');

    // Update values
    Meteor.call('saveApplication', this._id, Meteor.userId(), applicationValues.updateDoc, function(error, response) {
      if(error) {
        console.log(error);
      } 
    });

  },
});

