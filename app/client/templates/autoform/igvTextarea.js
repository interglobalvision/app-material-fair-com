Template.igvTextarea.onCreated(function () {
  this.data.atts['class'] = 'materialize-textarea';
});

Template.igvTextarea.onRendered(function () {
  $('textarea').characterCounter();
});