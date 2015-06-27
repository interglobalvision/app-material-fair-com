SimpleSchema.debug = true;

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
    optional: true,
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

  artists: {
    type: [Object,],
    minCount: 1,
  },
  'artists.$.name': {
    type: String,
  },
  'artists.$.cv': {
    type: String,
    autoform: {
      type: "docUpload",
    },
  },
  'artists.$.work': {
    type: [Object,],
    label: '',
    minCount: 1,
    maxCount: 5,
  },
  'artists.$.work.$.workTitle': {
    type: String,
  },
  'artists.$.work.$.medium': {
    type: String,
  },
  'artists.$.work.$.dimensions': {
    type: String,
  },
  'artists.$.work.$.year': {
    type: Number,
  },
  'artists.$.work.$.image': {
    type: String,
    autoform: {
      type: "imageUpload",
    },
  },
});

SignatureSchema = new SimpleSchema({
  signature: {
    type: Object,
  },
  'signature.name': {
    type: String,
  },
  'signature.galleryName': {
    type: String,
  },
  'signature.date': {
    type: Date,
  },
  'signature.signature': {
    type: String,
    autoform: {
      type: "signaturePad",
    },
  },
});

Meteor.startup(function() {
  ApplicationSchema.i18n('schemas.application');
  SignatureSchema.i18n('schemas.sign');
});