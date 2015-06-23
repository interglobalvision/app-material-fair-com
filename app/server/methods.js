Meteor.methods({
  // User methods
  createUserRoles: function(userId, role) {
    var result;

    if (Meteor.users.find().count() === 1) {
      Roles.addUsersToRoles(userId, ['admin',]);
      result = 'admin';
    } else if (role === 'committee' || role === 'admin') {
      Roles.addUsersToRoles(userId, [role,]);
      result = role;
    } else {
      Roles.addUsersToRoles(userId, ['applicant',]);
      result = 'applicant';
    }

    return result;
  },

  adminCreateUser: function(user) {
    var userId = Accounts.createUser(user);

    return userId;
  },

  enrollmentEmail: function(userId) {
    Accounts.sendEnrollmentEmail(userId);
    return 'success';
  },

  removeUser: function(userId) {
    Meteor.users.remove({_id: userId,});
  },

  setUserLanguage: function(userId, lang) {
    Meteor.users.update(userId, {$set:{'profile.lang':lang,},});
  },

  // Payment methods
  makePayment: function (params, applicationId) {
    this.unblock();

    params['method'] = 'transaccion';
    params['data[monto]'] = '1.00';
    params['data[idSucursal]'] = '7caa36207edfd028940cd642d9bddce0f3f6ab87';
    params['data[idUsuario]'] = '6ab29f84c3fd61418070b28dcf98d0130eb93d17';
    params['data[idServicio]'] = 3;
    params['data[divisa]'] = 'USD';

    var result,
    url = 'https://www.pagofacil.net/st/public/Wsrtransaccion/index/format/json',
    apiResult = HTTP.call('POST', url, {params: params,});
    
    var auth = apiResult.data.WebServices_Transacciones.transaccion.autorizado,
    transactionId = apiResult.data.WebServices_Transacciones.transaccion.transaccion,
    transaction = apiResult.data.WebServices_Transacciones.transaccion;

    console.log(apiResult.data);

    if (auth === '1') {
      Applications.update(applicationId, {$set: {transactionId: transactionId, transaction: transaction, status: 'paid',},});
      result = 1;
    } else {
      result = 0;
    }

    return result;
  },

});
