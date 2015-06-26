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
  'click #submit-payment': function(e) {
    e.preventDefault();

    // Disable submit button
    $('#submit-payment').attr('disabled','disabled');

    var paymentData = {
      "data[nombre]": $('#first-name').val(),
      "data[apellidos]": $('#last-name').val(),
      "data[numeroTarjeta]": $('#card-number').val().replace(/\D/g,''),
      "data[cvt]": $('#cvc').val().replace(/\D/g,''),
      "data[cp]": $('#postal-code').val(),
      "data[mesExpiracion]": $('#exp-month').val().replace(/\D/g,''),
      "data[anyoExpiracion]": $('#exp-year').val().replace(/\D/g,''),
      "data[telefono]": $('#phone').val().replace(/\D/g,''),
      "data[celular]": $('#cell').val().replace(/\D/g,''),
      "data[calleyNumero]": $('#address-1').val(),
      "data[colonia]": $('#address-2').val(),
      "data[municipio]": $('#city').val(),
      "data[estado]": $('#state').val(),
      "data[pais]": $('#country').val(),
    },
    applicationId = $('#application-id').val();

    function incomplete() {
      var result = false;
      var emptyFields;

      $.each(paymentData, function(key, value) {
        if (value === '') {
          emptyFields = true;
          console.log(key, value);
        } else {
          emptyFields = false;
        }

        if (emptyFields) {
          result = true;
        }
      });

      return result;
    }

    if (incomplete()) {
      Materialize.toast('Please complete all fields.', 3000);
      $('#submit-payment').removeAttr('disabled');
    } else {
      Meteor.call('makePayment', paymentData, applicationId, function(error, result) {
        if (error) {
          Materialize.toast(error.reason, 3000);
          $('#submit-payment').removeAttr('disabled');
        } else if (result === 1) {
          Materialize.toast('Thanks for your payment.', 3000);
        } else if (result === 0) {
          Materialize.toast('The transaction was denied. Please make sure all fields are completed correctly.', 3000);
          $('#submit-payment').removeAttr('disabled');
          Session.set('paymentErrors', (Session.get('paymentErrors') + 1));
        }
      });
    }
  },

  'click #request-alt': function() {
    Meteor.call('requestAltPaymentEmail', Meteor.userId());
    Materialize.toast('Alternate payment requested. Please wait for an email from Material Art Fair.', 3000);
  },
});