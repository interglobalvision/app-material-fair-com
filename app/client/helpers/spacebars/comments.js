// COMMENTS HELPERS

Handlebars.registerHelper('formatCommentTimestamp', function(timestamp) {
  var time = moment(timestamp, 'X');

  return time.fromNow();
});

Handlebars.registerHelper('isCommentOwner', function() {
  if (Meteor.userId() === this.userId) {
    return true;
  } else {
    return false;
  }
});

Handlebars.registerHelper('breaklines', function(text) {
  text = _.escape(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br/>');
  return text;
});