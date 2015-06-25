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

  // -- General Information
  general: {
    type: Object,
  },
  'general.galleryName': {
    type: String,
  },
  'general.website': {
    type: String,
    regEx: SimpleSchema.RegEx.Domain,
    optional: true,
  },
  'general.galleryYear': {
    type: Number,
  },
  'general.galleryHistory': {
    type: String,
    max: 2000,
    autoform: {
      type: 'textarea',
      rows: 10,
    },
  },
  'general.participation': {
    type: String,
    optional: true,
    max: 2000,
    autoform: {
      type: 'textarea',
      rows: 5,
    },
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
  
  // -- Social
  social: {
    type: Object,
  },
  'social.twitter': {
    type: String,
    optional: true,
  },
  'social.facebook': {
    type: String,
    optional: true,
  },
  'social.tumblr': {
    type: String,
    optional: true,
  },
  'social.instagram': {
    type: String,
    optional: true,
  },

  // Primary Contact
  contact: {
    type: Object,
  },
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

  // Proposal
  proposal: {
    type: Object,
  },
  'proposal.standProposal': {
    type: String,
    max: 2000,
    autoform: {
      type: 'textarea',
      rows: 5,
    },
  },
  'proposal.boothType': {
    type: String,
    allowedValues: [
      'Project',
      'Small',
      'Medium',
      'Medium Plus',
      'Large',
    ],
  },
  'proposal.artists': {
    type: [Object,],
    label: '',
    min: 1,
  },
  'proposal.artists.$.name': {
    type: String,
  },
  'proposal.artists.$.cv': {
    type: String,
  },
  'proposal.artists.$.work': {
    type: [Object,],
    label: '',
    min: 1,
  },
  'proposal.artists.$.work.$.workTitle': {
    type: String,
  },
  'proposal.artists.$.work.$.medium': {
    type: String,
  },
  'proposal.artists.$.work.$.dimensions': {
    type: String,
  },
  'proposal.artists.$.work.$.year': {
    type: Number,
  },
  'proposal.artists.$.work.$.image': {
    type: String,
  },
});

Meteor.startup(function() {
  ApplicationSchema.i18n('schemas.application');
});