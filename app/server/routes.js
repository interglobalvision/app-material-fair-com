 Router.route('/pdf/:_id', function() {
  var id = this.params._id;

  check(id, String);

  var application = Applications.findOne(id);

  if (application) {

    var user = Meteor.users.findOne(application.userId);
    var lang;
    var prefix;

    if (typeof user.profile === 'undefined') {
      lang = 'en';
    } else {
      lang = user.profile.lang;
    }

    if (process.env.NODE_ENV === 'development') {
      prefix = process.env.PWD + '/public';
    } else {
      prefix = '/bundle/bundle/programs/web.browser/app';
    }

    console.log(prefix);

    var doc = new PDFDocument({size: 'A4', margin: 50,});

    doc.font(prefix + '/fonts/Stanley-Bold.ttf');
    doc.fontSize(15);
    doc.text('Material Art Fair Application', {align: 'center',});

    doc.image(prefix + '/images/logo.png', 25, 25, {height: 60,});

    doc.moveDown(2.5);
    doc.fontSize(12);
    doc.text(TAPi18n.__('schemas.application.general.label', null, lang));
    doc.moveDown(0.5);
    doc.font(prefix + '/fonts/AkkuratPro.ttf');
    doc.fontSize(11);
    doc.text(application.galleryName);
    doc.moveDown(0.5);

    // address
    doc.text(application.address1);
    if (typeof application.address2 !== 'undefined') {
      doc.text(application.address2);
    }

    doc.text(application.city);
    doc.text(application.state);
    doc.text(application.postalCode);
    doc.text(application.country);
    doc.moveDown(0.5);

    // contact
    doc.text(application.galleryPhone);
    doc.moveDown(0.5);
    doc.text(application.galleryEmail);
    doc.moveDown(0.5);
    doc.text(application.website);
    doc.moveDown(1.5);
    doc.fontSize(12);

    // social links
    doc.font(prefix + '/fonts/Stanley-Bold.ttf');
    doc.text(TAPi18n.__('schemas.application.social.label', null, lang));
    doc.font(prefix + '/fonts/AkkuratPro.ttf');
    doc.fontSize(11);
    doc.moveDown(0.5);
    if (typeof application.twitter !== 'undefined') {
      doc.text('Twitter: ' + application.twitter);
    }

    if (typeof application.facebook !== 'undefined') {
      doc.text('Facebook: ' + application.facebook);
    }

    if (typeof application.tumblr !== 'undefined') {
      doc.text('Tumblr: ' + application.tumblr);
    }

    if (typeof application.instagram !== 'undefined') {
      doc.text('Instagram: ' + application.instagram);
    }

    doc.moveDown(1.5);

    // proposal
    doc.fontSize(12);
    doc.font(prefix + '/fonts/Stanley-Bold.ttf');
    doc.text(TAPi18n.__('schemas.application.proposal.label', null, lang));
    doc.font(prefix + '/fonts/AkkuratPro.ttf');
    doc.fontSize(11);
    doc.moveDown(0.5);
    doc.text(TAPi18n.__('schemas.application.galleryHistory.label', null, lang));
    doc.text(application.galleryHistory);
    doc.moveDown(0.5);
    doc.text(TAPi18n.__('schemas.application.artistsRepresented.label', null, lang));
    doc.text(application.artistsRepresented);
    doc.moveDown(0.5);
    doc.text(TAPi18n.__('schemas.application.galleryYear.label', null, lang));
    doc.text(application.galleryYear);
    doc.moveDown(0.5);
    doc.text(TAPi18n.__('schemas.application.participation.label', null, lang));
    doc.text(application.participation);
    doc.moveDown(0.5);
    doc.text(TAPi18n.__('schemas.application.standProposal.label', null, lang));
    doc.text(application.standProposal);
    doc.moveDown(0.5);
    doc.text(TAPi18n.__('schemas.application.booth.label', null, lang));
    doc.text(application.booth);
    doc.moveDown(1.5);

    // artists
    _.each(application.artists, function(artist) {
      doc.font(prefix + '/fonts/Stanley-Bold.ttf');
      doc.text(TAPi18n.__('schemas.application.artists.$.name.label', null, lang));
      doc.moveDown(0.5);
      doc.font(prefix + '/fonts/AkkuratPro.ttf');
      doc.text(artist.name);
      doc.moveDown(0.5);
      _.each(artist.work, function(work) {
        doc.text(work.workTitle);
        doc.text(work.medium);
        doc.text(work.dimensions);
        doc.text(work.year);
        doc.moveDown(0.5);
      });

      doc.moveDown(1.5);
    });

    // terms
    doc.fontSize(12);
    doc.font(prefix + '/fonts/Stanley-Bold.ttf');
    doc.text(TAPi18n.__('application-terms', null, lang));
    doc.moveDown(0.5);
    doc.font(prefix + '/fonts/AkkuratPro.ttf');
    doc.fontSize(8);
    doc.text(TAPi18n.__('application-terms-text-nohtml', null, lang));
    doc.moveDown(1.5);

    // signature
    doc.fontSize(12);
    doc.font(prefix + '/fonts/Stanley-Bold.ttf');
    doc.text(TAPi18n.__('schemas.sign.signature.title', null, lang));
    doc.font(prefix + '/fonts/AkkuratPro.ttf');
    doc.moveDown(0.5);
    doc.fontSize(9);
    doc.text(TAPi18n.__('application-terms-confirmation', null, lang));
    doc.moveDown(0.5);
    doc.text(TAPi18n.__('application-terms-accept', null, lang));
    doc.moveDown(0.5);
    doc.fontSize(11);
    doc.text(application.signatureName);
    doc.text(application.signatureGallery);
    doc.fontSize(10);
    doc.text(application.signatureDate);
    doc.moveDown(1.5);
    doc.image(new Buffer(application.signature.replace('data:image/png;base64,','') || '', 'base64'), {height: 70,});
    doc.moveDown(1.5);

    var filename = application.galleryName.replace(/\W+/g, '') + '_Material_Art_Fair_Application_2015.pdf';

    this.response.writeHead(200, {
      'Content-type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=' + filename,
    });
    this.response.end(doc.outputSync());

  } else {
    this.response.writeHead(302, {
      'Location': '/',
    });
    this.response.end();
  }

 }, {where: 'server',});