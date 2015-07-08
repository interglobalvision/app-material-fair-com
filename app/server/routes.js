 Router.route('/pdf/:_id', function() {
  var id = this.params._id;

  check(id, String);

  var application = Applications.findOne(id);

  if (application) {

    var user = Meteor.users.findOne(application.userId);
    var lang;

//     console.log(application);

    if (typeof user.profile === 'undefined') {
      lang = 'en';
    } else {
      lang = user.profile.lang;
    }

    var doc = new PDFDocument({size: 'A4', margin: 50,});

    doc.font(process.env.PWD + '/public/fonts/Stanley-Bold.ttf');
    doc.fontSize(15);
    doc.text('Material Art Fair Application', {align: 'center',});

    doc.image(process.env.PWD + '/public/images/logo.png', {height: 100,});

    doc.font(process.env.PWD + '/public/fonts/AkkuratPro.ttf');
    doc.moveDown(0.5);
    doc.fontSize(12);
    doc.text(TAPi18n.__('schemas.application.general.label', null, lang));
    doc.moveDown(0.5);
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
    doc.moveDown(0.5);
    doc.fontSize(12);

    // social links
    doc.text(TAPi18n.__('schemas.application.social.label', null, lang));
    doc.fontSize(11);
    doc.moveDown(0.5);
    if (typeof application.twitter !== 'undefined') {
      doc.text(application.twitter);
    }

    if (typeof application.facebook !== 'undefined') {
      doc.text(application.facebook);
    }

    if (typeof application.tumblr !== 'undefined') {
      doc.text(application.tumblr);
    }

    if (typeof application.instagram !== 'undefined') {
      doc.text(application.instagram);
    }

    doc.moveDown(1.5);

    // proposal
    doc.fontSize(12);
    doc.text(TAPi18n.__('schemas.application.proposal.label', null, lang));
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
    doc.fontSize(12);
    doc.text(TAPi18n.__('schemas.application.artists.label', null, lang));
    doc.fontSize(11);
    _.each(application.artists, function(artist) {
      doc.text(TAPi18n.__('schemas.application.artists.$.name.label', null, lang));
      doc.text(artist.name);
      _.each(artist.work, function(work) {

        var image = HTTP.get(work.image);

        var imageBuffer = new Buffer(image.content, 'binary');

//         console.log(imageBuffer);

        console.log(imageBuffer.toString('base64'));

//         doc.image(imageBuffer.toString('base64'), {height: 100,});

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
    doc.text(TAPi18n.__('application-terms', null, lang));
    doc.fontSize(9);
    doc.text(TAPi18n.__('application-terms-text', null, lang));
    doc.moveDown(1.5);

    // signature
    doc.fontSize(12);
    doc.text(TAPi18n.__('schemas.sign.signature.title', null, lang));
    doc.moveDown(1.5);
    doc.fontSize(9);
    doc.text(TAPi18n.__('application-terms-confirmation', null, lang));
    doc.text(TAPi18n.__('application-terms-accept', null, lang));
    doc.moveDown(0.5);
    doc.fontSize(11);
    doc.text(application.signatureName);
    doc.text(application.signatureGallery);
    doc.text(application.signatureDate);
    doc.moveDown(1.5);
    doc.image(new Buffer(application.signature.replace('data:image/png;base64,','') || '', 'base64'), {height: 100,});
    doc.moveDown(1.5);

    this.response.writeHead(200, {
      'Content-type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=test.pdf',
    });
    this.response.end(doc.outputSync());

  } else {
    this.response.writeHead(302, {
      'Location': '/',
    });
    this.response.end();
  }

 }, {where: 'server',});