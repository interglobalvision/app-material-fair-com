// Application Form Schema
ApplicationSchema = new SimpleSchema({
  status: {
    type: String,
    defaultValue: 'saved',
    allowedValues: [
      'saved',
      'submitted',
      'signed',
      'paid',
      'approved',
    ],
  },
  rating: {
    type: Number,
    defaultValue: 0,
  },

  // General Information
  galleryName: {
    type: String,
  },

  // -- Address
  address: {
    type: Object,
  },
  'address.line1': {
    type: String,
  },
  'address.line2': {
    type: String,
    optional: true,
  },
  'address.city': {
    type: String,
  },
  'address.state': {
    type: String,
    optional: true,
  },
  'address.postalCode': {
    type: String,
    optional: true,
  },
  galleryYear: {
    type: Number,
  },
  participation: {
    type: String,
    optional: true,
    max: 2000,
    autoform: {
      type: 'textarea',
      rows: 5,
    },
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Domain,
    optional: true,
  },
  twitter: {
    type: String,
    optional: true,
  },
  facebook: {
    type: String,
    optional: true,
  },
  tumblr: {
    type: String,
    optional: true,
  },
  instagram: {
    type: String,
    optional: true,
  },

  // Primary Contact
  'contact.name': {
    type: String,
  },
  'contact.email': {
    type: String,
    label: 'Email',
    regEx: SimpleSchema.RegEx.Email,
  },
  'contact.phone': {
    type: String,
  },
  galleryHistory: {
    type: String,
    max: 2000,
    autoform: {
      type: 'textarea',
      rows: 10,
    },
  },

  // Proposal
  standProposal: {
    type: String,
    max: 2000,
    autoform: {
      type: 'textarea',
      rows: 5,
    },
  },
  artists: {
    type: [Object,],
    label: '',
    min: 1,
  },
  /*
   * Gotta fogure it out how to save and relate pdf, i think with FS u just save the ID
   *
  'proposal.artists.$.cv': {
    type: String,
    label: 'Artist name',
  },
  */
  'artists.$.name': {
    type: String,
  },
  'artists.$.workTitle': {
    type: String,
  },
  'artists.$.medium': {
    type: String,
  },
  'artists.$.dimensions': {
    type: String,
  },
  'artists.$.year': {
    type: Number,
  },
  boothType: {
    type: String,
    allowedValues: [
      'Project',
      'Small',
      'Medium',
      'Medium Plus',
      'Large',
    ],
  },
});

Meteor.startup(function() {
  ApplicationSchema.i18n('schemas.application');
  Applications.attachSchema(ApplicationSchema);
});