Template.submissions.created = function () {
  //
};

Template.submissions.helpers({
  //
});

Template.submissions.rendered = function () {
  $(".js-sortable").tablesorter(); 
};

Template.submissions.events({
  'click .mark-waitlist': function(e) {
    e.preventDefault();

    Meteor.call('markWaitlist', this._id, function(error, result) {
      if (error) {
        console.log(reason);
        Materialize.toast(TAPi18n.__('alert-error'), 3000);
        Materialize.toast(error.reason, 3000);
      } else {
        Materialize.toast(TAPi18n.__('alert-waitlisted'), 3000);
      }
    });

  },

  'click .remove-waitlist': function(e) {
    e.preventDefault();

    Meteor.call('removeWaitlist', this._id, function(error, result) {
      if (error) {
        console.log(reason);
        Materialize.toast(TAPi18n.__('alert-error'), 3000);
        Materialize.toast(error.reason, 3000);
      } else {
        Materialize.toast(TAPi18n.__('alert-removed-waitlist'), 3000);
      }
    });

  },

  'click .mark-approved': function(e) {
    e.preventDefault();

    Meteor.call('markApproved', this._id, function(error, result) {
      if (error) {
        console.log(reason);
        Materialize.toast(TAPi18n.__('alert-error'), 3000);
        Materialize.toast(error.reason, 3000);
      } else {
        Materialize.toast(TAPi18n.__('alert-approved'), 3000);
      }
    });

  },

  'click .remove-approved': function(e) {
    e.preventDefault();

    Meteor.call('markApplicationPaid', this._id, function(error, result) {
      if (error) {
        console.log(reason);
        Materialize.toast(TAPi18n.__('alert-error'), 3000);
        Materialize.toast(error.reason, 3000);
      } else {
        Materialize.toast(TAPi18n.__('alert-removed-approved'), 3000);
      }
    });

  },
});