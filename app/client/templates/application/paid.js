Template.paid.onCreated( function() {
  //
});

Template.paid.helpers({
  //
});

Template.paid.rendered = function () {
  $(window).scrollTop( 0 );
};

Template.paid.events({
  'click #pdfDownload': function(e) {
    e.preventDefault();

    Blaze.saveAsPDF(Template.pdf, {
      filename: "material-application-2016.pdf",
      data: Applications.findOne(),
      format: "letter",
    });
  },
});
