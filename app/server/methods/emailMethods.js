Meteor.methods({

  adminEnrollmentEmail: function(userId) {
    check(userId, String);
    Accounts.sendEnrollmentEmail(userId);
    return 'success';
  },

  sendMail: function(email) {
    this.unblock();

    Email.send({
      to: email.address,
      from: Meteor.settings.email_from,
      subject: email.subject,
      text: email.text,
    });

  },

  applicantEnrollmentEmail: function(userId) {
    this.unblock();

    check(userId, String);

    var user = Meteor.users.findOne(userId);
    var email = {
      address: user.emails[0].address,
      subject: 'Signup Successful | Material Art Fair',
      text: 'Thanks for starting the application process for MAF 2015.\n\nYou can access your application at: http://app.material-fair.com/application\nSign in with the email address: ' + user.emails[0].address + ' and the password you chose.\n\nIf you have forgotten your password you can reset it at: http://app.material-fair.com/forgot.',
    };

    if (user.profile.lang === 'es') {
      email = {
        subject: 'Signup Successful | Material Art Fair',
        text: 'Thanks for starting the application process for MAF 2015.\n\nYou can access your application at: http://app.material-fair.com/application\nSign in with the email address: ' + user.emails[0].address + ' and the password you chose.\n\nIf you have forgotten your password you can reset it at: http://app.material-fair.com/forgot.',
      };
    }

    Meteor.call('sendMail', email);
  },

  paymentSuccessEmail: function(userId, transactionId, cardType, last4) {
    this.unblock();

    check(userId, String);

    var user = Meteor.users.findOne(userId);
    var email = {
      address: user.emails[0].address,
      subject: 'Payment Successful | Material Art Fair',
      text: 'Your payment ' + transactionId + ' to Material Art Fair has been completed from your ' + cardType + ' ending in ' + last4,
    };

    if (user.profile.lang === 'es') {
      email = {
        subject: 'Payment Successful | Material Art Fair',
        text: 'Your payment ' + transactionId + ' to Material Art Fair has been completed from your ' + cardType + ' ending in ' + last4,
      };
    }

    Meteor.call('sendMail', email);
  },

  requestAltPaymentEmail: function(userId) {
    this.unblock();

    check(userId, String);

    var user = Meteor.users.findOne(userId);
    var application = Applications.findOne({userId: userId,});

    var email = {
      address: 'brett@material-fair.com',
      subject: 'Offline payment needed for ' + application.general.galleryName + ' | Material Art Fair',
      text: application.general.galleryName + 'have requested alternate payment. Their email address to invoice is: ' + user.emails[0].address,
    };

    if (user.profile.lang === 'es') {
      email = {
        subject: 'Offline payment needed for ' + application.general.galleryName + ' | Material Art Fair',
        text: application.general.galleryName + 'have requested alternate payment. Their email address to invoice is: ' + user.emails[0].address,
      };
    }

    Meteor.call('sendMail', email);
  },

});
