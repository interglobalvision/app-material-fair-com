Template.fixedDate.rendered = function () {

  var now = moment();
  var $input = $('#' + this.data.atts.id);
  var $display = $input.siblings('.display-date');

  $input.val(now.format());
  $display.val(now.format('dddd, MMMM Do YYYY'));

};