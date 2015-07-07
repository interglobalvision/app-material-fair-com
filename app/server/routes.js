/*
 Router.route('/getPDF', function() {

  console.log(this.request);

  var doc = new PDFDocument({size: 'A4', margin: 50,});

  doc.fontSize(12);
  doc.text('PDFKit is simple', 10, 30, {align: 'center', width: 200,});
  this.response.writeHead(200, {
    'Content-type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=test.pdf',
  });
  this.response.end(doc.outputSync());
 }, {where: 'server',});
*/