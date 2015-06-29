Meteor.methods({
  // Payment methods
  makePayment: function (params, applicationId) {
    this.unblock();

    check(applicationId, String);

    params['data[email]'] = Meteor.user().emails[0].address;
    params.method = 'transaccion';
    params['data[monto]'] = '1.00';
    params['data[divisa]'] = 'USD';
    params['data[idUsuario]'] = Meteor.settings.pagofacil_usuario;
    params['data[idSucursal]'] = Meteor.settings.pagofacil_sucursal;
    params['data[idServicio]'] = 3;

    var result,
// dev url for dev keys [lol]
//     url = 'https://www.pagofacil.net/st/public/Wsrtransaccion/index/format/json',
    url = 'https://www.pagofacil.net/ws/public/Wsrtransaccion/index/format/json',
    apiResult = HTTP.call('POST', url, {params: params,});

    console.log(apiResult.data);
//     console.log(apiResult.data.WebServices_Transacciones.transaccion.error);

    var auth = apiResult.data.WebServices_Transacciones.transaccion.autorizado,
    transactionId = apiResult.data.WebServices_Transacciones.transaccion.transaccion,
    transaction = apiResult.data.WebServices_Transacciones.transaccion;

    if (auth === '1') {
      Applications.update(applicationId, {$set: {transactionId: transactionId, transaction: transaction, status: 'paid',},});
      result = 1;
      Meteor.call('paymentSuccessEmail', Meteor.userId());
    } else {
      console.log(apiResult.data.WebServices_Transacciones.transaccion.error);
      result = 0;
    }

    return result;
  },

});
