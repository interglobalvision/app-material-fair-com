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

    $('input#submit-payment').attr('disabled','disabled');

		var paymentData = {
			"jsonrpc": "2.0",
			"method": "transaccion",
			"params": {
				"data": {
					"nombre": "Juan",
					"apellidos": "Lopez",
					"numeroTarjeta": "5579567890123456", "cvt": "123",
					"cp": "11560",
					"mesExpiracion": "10", "anyoExpiracion": "15",
					"monto": "100",
					"idSucursal": "1",
					"idUsuario": "1",
					"idServicio": "3",
					"email": "comprador@correo.com",
					"telefono": "5550220910",
					"celular": "5550123456",
					"calleyNumero": "Anatole France 311",
					"colonia": "Polanco",
					"municipio": "Miguel Hidalgo",
					"estado": "Distrito Federal",
					"pais": "Mexico",
					"param1": "",
					"param2": "",
					"param3": "",
					"param4": "",
					"param5": "",
				}, 
			},
			"id": "test",
		};

      console.log(paymentData);
/*
    var request = $.ajax({
			url: "https://www.pagofacil.net/st/public/Wsjtransaccion/",
		  method: "POST",
		  data: paymentData,
		  dataType: "json"
		});*/
  },
});