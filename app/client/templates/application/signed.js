Template.signed.rendered = function () {
  $(window).scrollTop( 0 );

  $('select').material_select();

  Session.set('paymentErrors', 0);

  Tracker.autorun(function() {
    if (Session.get('paymentErrors') === 3) {
      $('#alt-payment-modal').openModal();
    }
  });
};

Template.signed.events({
  'submit #pay': function(e) {
    e.preventDefault();

    // Disable pay button
    $('#submit-payment').attr('disabled','disabled');

    var $form = $(e.currentTarget);
    var data = {
      applicationId: $('#application-id').val(),
      name: $('#name').val(),
      address1: $('#address-1').val(),
      address2: $('#address-2').val(),
      city: $('#city').val(),
      state: $('#state').val(),
      postalCode: $('#postal-code').val(),
      country: $('#country').val(),
      tel: $('#tel').val(),
    };

    Conekta.locale = TAPi18n.getLanguage();

    Conekta.token.create($form, function(result) {
      data.token = result.id;

      Meteor.call('makePayment', data, function(error, result) {

        console.log(result);

        if (error) {

          console.log(error);
          Materialize.toast(TAPi18n.__('alert-error'), 3000);
          Materialize.toast(error.reason, 3000);
          Session.set('paymentErrors', (Session.get('paymentErrors') + 1));

        } else {
          Materialize.toast(TAPi18n.__('alert-pay_thanks'), 3000);
        }
      });

    }, function(error) {

        console.log(error);
        Materialize.toast(TAPi18n.__('alert-error'), 3000);
        Materialize.toast(error.message_to_purchaser, 3000);

    });

    // Enable pay button
    $('#submit-payment').removeAttr('disabled');

  },

  'click #request-alt': function() {
    Meteor.call('requestAltPaymentEmail', Meteor.userId());
    Materialize.toast(TAPi18n.__('alert-pay_alternate'), 3000);
  },
});
