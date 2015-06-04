/* ---------------------------------------------------- +/

## Applications ##

All code related to the Applications collection goes here. 

/+ ---------------------------------------------------- */

Applications = new Meteor.Collection('applications');

// Schema
Applications.attachSchema( new SimpleSchema({
  submited: {
    type: Boolean,
    label: 'Submited',
    defaultValue: false,
  },
  signed: {
    type: Boolean,
    label: 'Signed',
    defaultValue: false,
  },
  paid: {
    type: Boolean,
    label: 'Paid',
    defaultValue: false,
  },
  approved: {
    type: Boolean,
    label: 'Approved',
    defaultValue: false,
  },
  rating: {
    type: Number,
    label: 'Rating',
    defaultValue: 0,
  },

  // General Information
  galleryName: {
    type: String,
    label: 'Gallery Name',
  },
  address1: {
    type: String,
    label: 'Address (Line 1)',
  },
  address2: {
    type: String,
    label: 'Address (Line 2)',
  },
  city: {
    type: String,
    label: 'City',
  },
  state: {
    type: String,
    label: 'State (if applicable)',
    optional: true,
  },
  postalCode: {
    type: String,
    label: 'Postal Code (if applicable)',
    optional: true,
  },
  galleryYear: {
    type: String,
    label: 'Year gallery was founded',
  },
  participation: {
    type: String,
    label: 'Participation in other fairs',
    optional: true,
  },
  website: {
    type: String,
    label: 'Website',
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  twitter: {
    type: String,
    label: 'Twitter Username',
    optional: true,
  },
  facebook: {
    type: String,
    label: 'Facebook',
    optional: true,
  },
  tumblr: {
    type: String,
    label: 'Tumblr',
    optional: true,
  },
  instagram: {
    type: String,
    label: 'Instagram',
    optional: true,
  },

  // Primary Contact
  contact: {
    type: Object,
  },
  'contact.name': {
    type: String,
    label: 'Name',
    regEx: SimpleSchema.RegEx.Email,
  },
  'contact.email': {
    type: String,
    label: 'Email',
    regEx: SimpleSchema.RegEx.Email,
  },
  'contact.phone': {
    type: String,
    label: 'Mobile Phone',
    regEx: SimpleSchema.RegEx.Email,
  },

  // Proposal
  'proposal.galleryHistory': {
    type: String,
    label: 'Brief history of the gallery',
  },
  'proposal.standProposal': {
    type: String,
    label: 'Proposal for Material Art Fair 2016 stand',
  },
  'proposal.artists': {
    type: [Object,],
    label: 'Artists represented by the gallery',
  },
  /*
   * Gotta fogure it out how to save and relate pdf, i think with FS u just save the ID
   *
  'proposal.artists.$.cv': {
    type: String,
    label: 'Artist name',
  },
  */
  'proposal.artists.$.name': {
    type: String,
    label: 'Artist name',
  },
  'proposal.artists.$.workTitle': {
    type: String,
    label: 'Work title',
  },
  'proposal.artists.$.medium': {
    type: String,
    label: 'Medium',
  },
  'proposal.artists.$.dimensions': {
    type: String,
    label: 'Dimensions',
  },
  'proposal.artists.$.year': {
    type: Number,
    label: 'Year',
  },
  'boothType': {
    type: String,
    label: "Booth size",
  },
}));

// Allow/Deny

Applications.allow({
  insert: function(userId, doc){
    return can.createApplication(userId);
  },

  update: function(userId, doc, fieldNames, modifier){
    return can.editApplication(userId, doc);
  },

  remove: function(userId, doc){
    return can.removeApplication(userId, doc);
  },
});

// Methods

Meteor.methods({
  createApplication: function(application){
    if(can.createApplication(Meteor.user())){
      Applications.insert(application);
    }
  },

  removeApplication: function(application){
    if(can.removeApplication(Meteor.user(), application)){
      Applications.remove(application._id);
    }else{
      throw new Meteor.Error(403, 'You do not have the rights to delete this application.');
    }
  },
});
