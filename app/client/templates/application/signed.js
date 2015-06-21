Template.signed.onCreated( function() {
  //
});

Template.signed.helpers({
  //
});

Template.signed.rendered = function () {
  $(window).scrollTop( 0 );

  $('select').material_select();
};

Template.signed.events({
  'submit #payment-form': function(e){
    e.preventDefault();

    $('button[type="submit"]').attr('disabled','disabled');
  },
});