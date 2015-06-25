Meteor.methods({

  adminEnrollmentEmail: function(userId) {
    Accounts.sendEnrollmentEmail(userId);
    return 'success';
  },

  sendMail: function(mail) {
    this.unblock();

    Email.send({
      to: mail.address,
      from: Meteor.settings.email_from,
      subject: mail.subject,
      text: mail.text,
    });

  },

  applicantEnrollmentEmail: function(userId) {
    this.unblock();

    var user = Meteor.users.findOne(userId);
    var mail = {
      address: user.emails[0].address,
      subject: 'Signup Successful | Material Art Fair',
      text: 'Thanks for starting the application process for MAF 2015. You can access your application at: http://app.material-fair.com/application . Sign in with the email address: ' + user.emails[0].address + 'and the password you chose. If you have forgotten your password you can reset it at: http://app.material-fair.com/forgot.',
    };

    if (user.profile.lang === 'es') {
      mail = {
        subject: 'Signup Success es | Material Art Fair',
        text: 'ES Thanks for starting the application process for MAF 2015. You can access your application at: http://app.material-fair.com/application . Sign in with the email address: ' + user.emails[0].address + 'and the password you chose. If you have forgotten your password you can reset it at: http://app.material-fair.com/forgot.',
      };
    }

    Meteor.call('sendMail', mail);
  },

  paymentSuccessEmail: function(userId) {
    this.unblock();

    var user = Meteor.users.findOne(userId);
    var email = {
      address: user.emails[0].address,
      subject: 'Payment Successful | Material Art Fair',
      text: 'Thanks for completing the application process for MAF 2015',
    };

    if (user.profile.lang === 'es') {
      email = {
        subject: 'Pago Completado | Material Art Fair',
        text: 'Gracias',
      };
    }

    Meteor.call('sendMail', mail);
  },

});