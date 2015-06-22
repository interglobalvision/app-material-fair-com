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
  	cvt = $('#cvt').val().replace(/\D/g,''),
  	postalCode = $('#postal-code').val().replace(/\D/g,''),
  	month = $('#exp-month').val().replace(/\D/g,''),
  	year = $('#exp-year').val().replace(/\D/g,''),
  	amount = $('#amount').val(),
  	email = $('#email').val(),
  	phone = $('#phone').val(),
  	cell = $('#cell').val(),
  	address1 = $('#address-1').val(),
  	address2 = $('#address-2').val(),
  	city = $('#city').val(),
  	state = $('#state').val(),
  	country = $('#country').val();

		var paymentData = { "jsonrpc": "2.0",
		"method": "transaccion",
		"params": { 
			"data": { 
				"nombre": first,
				"apellidos": last,
				"numeroTarjeta": cardNumber, 
				"cvt": cvt,
				"cp": postalCode,
				"mesExpiracion": month, 
				"anyoExpiracion": year,
				"monto": "150.00",
				"idSucursal": "7caa36207edfd028940cd642d9bddce0f3f6ab87",
				"idUsuario": "6ab29f84c3fd61418070b28dcf98d0130eb93d17",
				"idServicio": "3",
				"email": email,
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
		emptyFields = false;

		$.each(paymentData, function(key, value) {
			console.log(key, value);
			if (value == "" ) {
				emptyFields = true;
				Materialize.toast('Please complete all fields.', 3000);
			}
		});
/*
    var request = $.ajax({
			url: "https://www.pagofacil.net/st/public/Wsjtransaccion/",
		  method: "POST",
		  data: paymentData,
		  dataType: "json"
		});*/
  },
});