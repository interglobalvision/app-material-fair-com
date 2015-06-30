Meteor.methods({
  // Payment methods
  makePayment: function (data) {

    check(data, Object);
    check(data.token, String);
    check(data.applicationId, String);

    var result = false;
    var _error;

    var conekta = Meteor.npmRequire('conekta');

    conekta.api_key = Meteor.settings.conekta_private_sandbox;

    var email = Meteor.user().emails[0].address;

    conekta.Charge.create({
      "amount": 125,
      "currency": "USD",
      "description": "Material Art Fair",
      "reference_id": data.applicationId,
      "card": data.token,
      "details": {
        "email": email,
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

        console.log(charge.id);
        console.log(charge.status);
        console.log(charge.reference_id);

        Applications.update(data.applicationId, {$set: {transactionId: charge.id, transaction: charge, status: 'paid',},});
        Meteor.call('paymentSuccessEmail', Meteor.userId());

        result = true;

    }, function(error) {

      _error = error;

    });

    console.log(_error);

    if (result) {

      return result;

    } else {

      throw new Meteor.Error('card-payment-failed', _error.message_to_purchaser);

    }
  },

});
