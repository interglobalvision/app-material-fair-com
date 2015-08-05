Handlebars.registerHelper('ifNoRatingShowRed', function() {
  if (this.rating) {
    return {
      class: 'card-panel',
    }
  } else {
    return {
      class: 'card-panel red accent-2',
    }
  }
});