Template.saved.onCreated( function() {
  //
});

Template.saved.helpers({
  //
});

Template.saved.rendered = function () {
  $(window).scrollTop( 0 );

  $('#saveApplication').pushpin({
    top: $('#saveApplication').offset().top,
    offset: 20,
  });
};

Template.saved.events({
  'click #saveApplication': function(e) {
    e.preventDefault();

    document.querySelector('.progress').style.opacity = 1;

    var applicationValues = AutoForm.getFormValues('insertApplicationForm');

    // Update values
    // >>> should this use a Method? This method is declared on both the client and server as in /collections/applications.js. Where does this function actually go to? This should just be on the client I think. Probably not a method call. As long as the allow/deny rules are correct on the server it will update the database record from the subscription.
    Meteor.call('saveApplication', this._id, applicationValues.updateDoc, function(error, response) {
      if (error) {
        // >>> we need error handling
        console.log(error);
      } else {
        Materialize.toast('Application saved', 4000);
      }
    });

    document.querySelector('.progress').style.opacity = 0;

  },
});
