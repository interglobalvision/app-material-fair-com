Template.submissions.created = function () {
  //
};

Template.submissions.helpers({
  //
});

Template.submissions.rendered = function () {
  //
};

Template.submissions.events({
  'click .mark-as-paid': function(e) {
    e.preventDefault();

    Meteor.call('markApplicationPaid', this._id, function(error, result) {
      if (error) {
        console.log(error.reason);
        Materialize.toast(error, 3000);
      } else {
        Materialize.toast('Application marked as paid', 3000);
      }
    });

  },
});