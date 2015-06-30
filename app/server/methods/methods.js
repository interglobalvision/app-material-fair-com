Meteor.methods({
  // Payment methods
  makePayment: function (data) {

    check(data, Object);
    check(data.token, String);
    check(data.applicationId, String);

    var Conekta = Meteor.npmRequire('conekta');
    var Future = Npm.require('fibers/future');
    var charge;

    Conekta.locale = Meteor.user().profile.lang;

    Conekta.api_key = Meteor.settings.conekta_private_sandbox;

    data.email = Meteor.user().emails[0].address;

    var conektaSync = function(data) {
      var future = new Future();

      Conekta.Charge.create({
        "amount": 125,
        "currency": "USD",
        "description": "Material Art Fair",
        "reference_id": data.applicationId,
        "card": data.token,
        "details": {
          "email": data.email,
          "line_items": [{
            "name": "Material Art Fair application fee",
            "sku": "maf_fee_1",
            "unit_price": 125,
            "description": "Art Fair Application",
            "quantity": 1,
            "type": "application",
          },],
          "phone": data.tel,
          "billing_address": {
            "street1": data.address1,
            "street2": data.address2,
            "city": data.city,
            "state": data.state,
            "zip": data.postalCode,
          },
        },
      },
        function(charge) {

          future.return(charge);

      }, function(error) {

          future.return(error);

      });

      return future.wait();

    };

    var chargeResult = conektaSync(data);

    if (chargeResult.object === 'error') {
      throw new Meteor.Error('card-payment-failed', chargeResult.message_to_purchaser);
    }

    charge = chargeResult._json;

    console.log(charge.id);
/*
    console.log(charge.status);
    console.log(charge.reference_id);
*/

    Meteor.call('paymentSuccessEmail', Meteor.userId());
    return Applications.update(data.applicationId, {$set: {transactionId: charge.id, transaction: charge, status: 'paid',},});

  },

});
