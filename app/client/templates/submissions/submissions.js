Template.submissions.onRendered(function() {
  var _this = this;

  _this.$('.js-sortable').tablesorter();

});

Template.submissions.events({
  'click .mark-waitlist': function(e) {
    e.preventDefault();

    Meteor.call('markWaitlist', this._id, function(error, result) {
      if (error) {
        console.log(reason);
        Materialize.toast(TAPi18n.__('alert-error'), 3000);
        Materialize.toast(error.reason, 3000);
      } else {

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

      }
    });

  },

  'click .remove-approved': function(e) {
    e.preventDefault();

    Meteor.call('removeApproved', this._id, function(error, result) {
      if (error) {
        console.log(reason);
        Materialize.toast(TAPi18n.__('alert-error'), 3000);
        Materialize.toast(error.reason, 3000);
      } else {

      }
    });

  },
});
