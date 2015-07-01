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
  galleryName: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
    optional: true,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
    optional: true,
  },
  postalCode: {
    type: String,
    optional: true,
  },
  galleryPhone: {
    type: String,
  },
  galleryEmail: {
    type: String,
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Domain,
    optional: true,
  },

  // Primary Contact
  contactName: {
    type: String,
  },
  contactEmail: {
    type: String,
    label: 'Email',
    regEx: SimpleSchema.RegEx.Email,
  },
  contactPhone: {
    type: String,
  },

  // -- Social
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

  // Proposal
  galleryHistory: {
    type: String,
    max: 2000,
    autoform: {
      type: 'textarea',
      rows: 10,
    },
  },
  artistsRepresented: {
    type: String,
    max: 2000,
    autoform: {
      type: 'textarea',
      rows: 5,
    },
  },
  galleryYear: {
    type: Number,
  },
  participation: {
    type: String,
  },
  standProposal: {
    type: String,
    max: 2000,
    autoform: {
      type: 'textarea',
      rows: 5,
    },
  },

  // Artists
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
    minCount: 1,
    maxCount: 5,
  },
  'artists.$.work.$.image': {
    type: String,
    autoform: {
      type: "imageUpload",
    },
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

  // Booth
  booth: {
    type: Object,
  },
  'booth.project.single': {
    type: Boolean,
    optional: true,
    label: function() {
      if (TAPi18n.getLanguage() === 'es') {
        return 'Sencillo';
      } else {
        return 'Single';
      }
    },

    autoform: {
      type: 'materializedCheckbox',
    },
  },
  'booth.project.double': {
    type: Boolean,
    optional: true,
    label: function() {
      if (TAPi18n.getLanguage() === 'es') {
        return 'Doble';
      } else {
        return 'Double';
      }
    },

    autoform: {
      type: 'materializedCheckbox',
    },
  },
  'booth.principal.small': {
    type: Boolean,
    optional: true,
    label: function() {
      if (TAPi18n.getLanguage() === 'es') {
        return 'Chico';
      } else {
        return 'Small';
      }
    },

    autoform: {
      type: 'materializedCheckbox',
    },
  },
  'booth.principal.medium': {
    type: Boolean,
    optional: true,
    label: function() {
      if (TAPi18n.getLanguage() === 'es') {
        return 'Mediano';
      } else {
        return 'Medium';
      }
    },

    autoform: {
      type: 'materializedCheckbox',
    },
  },
  'booth.principal.mediumPlus': {
    type: Boolean,
    optional: true,
    label: function() {
      if (TAPi18n.getLanguage() === 'es') {
        return 'Mediano Plus';
      } else {
        return 'Medium Plus';
      }
    },

    autoform: {
      type: 'materializedCheckbox',
    },
  },
  'booth.principal.large': {
    type: Boolean,
    optional: true,
    label: function() {
      if (TAPi18n.getLanguage() === 'es') {
        return 'Grande';
      } else {
        return 'Large';
      }
    },

    autoform: {
      type: 'materializedCheckbox',
    },
  },
  'booth.principal.extraLarge': {
    type: Boolean,
    optional: true,
    label: function() {
      if (TAPi18n.getLanguage() === 'es') {
        return 'Extra Grande';
      } else {
        return 'Extra Large';
      }
    },

    autoform: {
      type: 'materializedCheckbox',
    },
  },

});

SignatureSchema = new SimpleSchema({
  signatureName: {
    type: String,
  },
  signatureGallery: {
    type: String,
  },
  signatureDate: {
    type: String,
    autoform: {
      type: 'fixedDate',
    },
  },
  signature: {
    type: String,
    autoform: {
      type: 'signaturePad',
    },
  },
});

Meteor.startup(function() {
  ApplicationSchema.i18n('schemas.application');
  SignatureSchema.i18n('schemas.sign');
});