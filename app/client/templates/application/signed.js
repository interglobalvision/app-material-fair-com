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
	'click #submit-payment': function(e){
		e.preventDefault();

		// Disable submit button
		//$('input#submit-payment').attr('disabled','disabled');

		var paymentData = {
			"data[nombre]": $('#first-name').val(),
			"data[apellidos]": $('#last-name').val(),
			"data[numeroTarjeta]": $('#card-number').val().replace(/\D/g,''),
			"data[cvt]": $('#cvc').val().replace(/\D/g,''),
			"data[cp]": $('#postal-code').val().replace(/\D/g,''),
			"data[mesExpiracion]": $('#exp-month').val().replace(/\D/g,''),
			"data[anyoExpiracion]": $('#exp-year').val().replace(/\D/g,''),
			"data[email]": "michaelrayvon@gmail.com",
			"data[telefono]": $('#phone').val().replace(/\D/g,''),
			"data[celular]": $('#cell').val().replace(/\D/g,''),
			"data[calleyNumero]": $('#address-1').val(),
			"data[colonia]": $('#address-2').val(),
			"data[municipio]": $('#city').val(),
			"data[estado]": $('#state').val(),
			"data[pais]": $('#country').val(),
		},
		applicationId = $('#application-id').val(),
		emptyFields;

		function incomplete() {
			$.each(paymentData, function(key, value) {
				if (value === "" ) {
					emptyFields = true;
					console.log(key, value);
				} else {
					emptyFields = false;
				}
			});
			///>>> this will return false as long as the last paymentData item is not empty as the falsy is overwritten. Also does this work with the array?

			return emptyFields;
		}

		if (incomplete()) {
			Materialize.toast('Please complete all fields.', 3000);
		} else {
			console.log(paymentData);
			Meteor.call('makePayment', paymentData, applicationId, function(error, result) {
				if (error) {
					Materialize.toast(error.reason, 3000);
				} else {
					Materialize.toast('Thanks for your payment.', 3000);
					console.log(result);
				}
			});
		}
	},
});