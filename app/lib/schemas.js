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
  'booth': {
    type: String,
    label: 'Project Booth Sizes',

    autoform: {
      type: 'igvCheckboxGroup',
      options: function () {
        if (TAPi18n.getLanguage() === 'es') {
          return [
            {id: Random.id(6), type: 'Proyecto', label: 'Sencillo', value: 'single', cost: '3 m2, $525 usd',},
            {id: Random.id(6), type: 'Proyecto', label: 'Doble', value: 'double', cost: '6 m2, $1050 usd',},
            {id: Random.id(6), type: 'Principal', label: 'Small', value: 'small', cost: '9 m2, $2475 usd',},
            {id: Random.id(6), type: 'Principal', label: 'Medium', value: 'medium', cost: '12 m2, $3300 usd',},
            {id: Random.id(6), type: 'Principal', label: 'Medium Plus', value: 'medium-plus', cost: '16 m2, $4400 usd',},
            {id: Random.id(6), type: 'Principal', label: 'Large', value: 'large', cost: '16 m2, $4400 usd',},
            {id: Random.id(6), type: 'Principal', label: 'Extra Large', value: 'extra-large', cost: 'Please contact us at <a href="mailto:applications@material-fair.com">applications@material-fair.com</a> for more information.',},
          ];
        } else {
          return [
            {id: Random.id(6), type: 'Project', label: 'Single', value: 'single', cost: '3 m2, $525 usd',},
            {id: Random.id(6), type: 'Project', label: 'Double', value: 'double', cost: '6 m2, $1050 usd',},
            {id: Random.id(6), type: 'Principal', label: 'Small', value: 'small', cost: '9 m2, $2475 usd',},
            {id: Random.id(6), type: 'Principal', label: 'Medium', value: 'medium', cost: '12 m2, $3300 usd',},
            {id: Random.id(6), type: 'Principal', label: 'Medium Plus', value: 'medium-plus', cost: '16 m2, $4400 usd',},
            {id: Random.id(6), type: 'Principal', label: 'Large', value: 'large', cost: '16 m2, $4400 usd',},
            {id: Random.id(6), type: 'Principal', label: 'Extra Large', value: 'extra-large', cost: 'Please contact us at <a href="mailto:applications@material-fair.com">applications@material-fair.com</a> for more information.',},
          ];
        }
      },
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