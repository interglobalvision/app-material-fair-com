Template.saved.rendered = function () {
  $(window).scrollTop( 0 );

  $('select').material_select();

  $('textarea').addClass('materialize-textarea').characterCounter();

  var booths = Applications.findOne().booth,
    boothArr = booths.split(',');

  console.log(boothArr);
  
  $.each(boothArr, function(key,value) {
    $('input[value="'+value+'"]')[0].checked = true;
  });
};

Template.saved.events({
  'click .saveApplication': function(e) {
    e.preventDefault();

    document.querySelector('.progress').style.opacity = 1;

    var applicationValues = AutoForm.getFormValues('insertApplicationForm');

    // Update values
    Applications.update(this._id, applicationValues.updateDoc, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        Materialize.toast('Application saved', 3000);
      }

      document.querySelector('.progress').style.opacity = 0;
    });

  },
});
