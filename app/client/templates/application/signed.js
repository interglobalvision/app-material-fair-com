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

		var first = $('#first-name').val(),
		last = $('#last-name').val(),
		cardNumber = $('#card-number').val().replace(/\D/g,''),
		cvc = $('#cvc').val().replace(/\D/g,''),
		postalCode = $('#postal-code').val().replace(/\D/g,''),
		month = $('#exp-month').val().replace(/\D/g,''),
		year = $('#exp-year').val().replace(/\D/g,''),
		amount = $('#amount').val(),
		email = $('#email').val(),
		phone = $('#phone').val().replace(/\D/g,''),
		cell = $('#cell').val().replace(/\D/g,''),
		address1 = $('#address-1').val(),
		address2 = $('#address-2').val(),
		city = $('#city').val(),
		state = $('#state').val(),
		country = $('#country').val(),
		sucursal = "7caa36207edfd028940cd642d9bddce0f3f6ab87",
		usuario = "6ab29f84c3fd61418070b28dcf98d0130eb93d17";

		var paymentData = {"jsonrpc": "2.0",
			"method": "transaccion",
			"params": { 
				"data": { 
				"nombre": first,
				"apellidos": last,
				"numeroTarjeta": cardNumber, 
				"cvt": cvc,
				"cp": postalCode,
				"mesExpiracion": month, 
				"anyoExpiracion": year,
				"monto": "150.00",
				"idSucursal": "7caa36207edfd028940cd642d9bddce0f3f6ab87",
				"idUsuario": "6ab29f84c3fd61418070b28dcf98d0130eb93d17",
				"idServicio": "3",
				"email": "email@email.com",
				"telefono": phone,
				"celular": cell,
				"calleyNumero": address1,
				"colonia": address2,
				"municipio": city,
				"estado": state,
				"pais": country, 
				}, 
			}, 
		},
		url = "https://www.pagofacil.net/ws/public/Wsjrecurrentes/",
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

			return emptyFields;
		}

		if (incomplete()) {
			Materialize.toast('Please complete all fields.', 3000);
		} else {
			Meteor.call('makePayment', url, paymentData, function(error, result) {
				if (error) {
					Materialize.toast(error.reason, 3000);
				} else {
					console.log(result);
				}
			});
		}
	},
});