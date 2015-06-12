Template.application.created = function () {
};

Template.application.helpers({
  statusTemplate: function(status) {
    switch (status) {
      case 'approved': {
        return Template.applicationIdk;
      }

      case 'paid': {
        return Template.applicationThanx;
      }
      
      case 'signed': {
        return Template.applicationPay;
      }

      case 'submitted': {
        return Template.applicationSign;
      }

      case 'created': {
        console.log('created');
        return Template.applicationAdd;
      }
    }
  },
});

Template.application.rendered = function () {
  //
};

Template.application.events({
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
