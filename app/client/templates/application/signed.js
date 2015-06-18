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

Template.paypalCreditCardForm.events({
  'submit #paypal-payment-form': function(event, tmp){
    event.preventDefault();

    var cardData = Template.paypalCreditCardForm.card_data();

    $('button[type="submit"]').attr('disabled','disabled');
/*
    Meteor.Paypal.purchase(cardData, {total: '100.50', currency: 'USD'}, function(error, results){
      if (error) {
      	Materialize.toast(error.reason, 3000);
    	} else {
    		Materialize.toast('Ok! Payment recieved.', 3000);
    	}
    });*/
  },
});