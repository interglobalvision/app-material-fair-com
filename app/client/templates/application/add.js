Template.saved.rendered = function () {
  $(window).scrollTop( 0 );

  $('select').material_select();

  $('textarea').addClass('materialize-textarea').characterCounter();

  if (Applications.findOne().booth) {
    var booths = Applications.findOne().booth,
      boothArr = booths.split(',');
    
    $.each(boothArr, function(key,value) {
      $('input[value="' + value + '"]')[0].checked = true;
    });
  }
};

Template.saved.events({
  'click .saveApplication': function(e) {
    e.preventDefault();

    document.querySelector('.progress').style.opacity = 1;

    var applicationValues = AutoForm.getFormValues('insertApplicationForm');

    // Update values
    Meteor.call('saveApplication', this._id, applicationValues.updateDoc, function(error, response) {
      if (error) {
        console.log(error);
        Materialize.toast(TAPi18n.__('alert-error'), 3000);
        Materialize.toast(error.reason, 3000);
      } else {
        Materialize.toast(TAPi18n.__('alert-application_saved'), 3000);
      }

      document.querySelector('.progress').style.opacity = 0;
    });

  },
});
