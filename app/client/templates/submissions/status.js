Template.status.onCreated(function() {

});

Template.status.helpers({
  hasProposal: function(_id) {

  },

  hasArtists: function(_id) {

  },
});

Template.status.onRendered(function() {
  $(".js-sortable").tablesorter(); 
});

Template.status.events({
  'click .mark-as-paid': function(e) {
    e.preventDefault();

    Meteor.call('markApplicationPaid', this._id, function(error, result) {
      if (error) {
        console.log(reason);
        Materialize.toast(TAPi18n.__('alert-error'), 3000);
        Materialize.toast(error.reason, 3000);
      } else {
        Materialize.toast(TAPi18n.__('alert-marked_paid'), 3000);
      }
    });

  },
});