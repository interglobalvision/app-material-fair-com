Template.igvCheckboxGroup.rendered = function () {
  console.log(this);
};

/*Template.igvCheckboxGroup.created = function () {
  console.log(this);
};*/

Template.igvCheckboxGroup.helpers({
  dsk: function dsk() {
    return {
      'data-schema-key': this.atts['data-schema-key'],
    };
  },
});