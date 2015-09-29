Template.exhibitors.created = function () {
  //
};

Template.exhibitors.helpers({
	galleryName: function() {
    var application = Applications.findOne({userId: this._id}, {galleryName: 1});
    return application.galleryName;
  },
  contactEmail: function() {
    var application = Applications.findOne({userId: this._id}, {contactEmail: 1});
    return application.contactEmail;
  },
});

Template.exhibitors.rendered = function () {
  var _this = this;

  _this.$('.js-sortable').tablesorter();
};

Template.exhibitors.events({
//
});
