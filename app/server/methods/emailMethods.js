Meteor.methods({

  adminEnrollmentEmail: function(userId) {
    Accounts.sendEnrollmentEmail(userId);
    return 'success';
  },

  applicantEnrollmentEmail: function(userId) {
    Accounts.sendEnrollmentEmail(userId);
  },

  paymentSuccessEmail: function(userId) {
    this.unblock();

    var user = Meteor.users.findOne(userId);
    var email = {
      subject: 'Payment Successful | Material Art Fair',
      text: 'Thanks for completing the application process for MAF 2015',
    };

    if (user.profile.lang === 'es') {
      email = {
        subject: 'Pago Completado | Material Art Fair',
        text: 'Gracias',
      };
    }

    Email.send({
      to: user.emails[0].address,
      from: Meteor.settings.email_from,
      subject: email.subject,
      text: email.text,
    });
  },

});
