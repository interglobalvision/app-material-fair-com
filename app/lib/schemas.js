Schemas = {};

// Application Form Schema
Schemas.applicationForm = new SimpleSchema({
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
    label: 'Rating',
    defaultValue: 0,
  },

  // General Information
  galleryName: {
    type: String,
    label: 'Gallery Name',
  },

  // -- Address
  address: {
    type: Object,
    label: 'Address',
  },
  'address.line1': {
    type: String,
    label: '',
  },
  'address.line2': {
    type: String,
    label: '',
    optional: true,
  },
  'address.city': {
    type: String,
    label: 'City',
  },
  'address.state': {
    type: String,
    label: 'State (if applicable)',
    optional: true,
  },
  'address.postalCode': {
    type: String,
    label: 'Postal Code (if applicable)',
    optional: true,
  },
  galleryYear: {
    type: Number,
    label: 'Year gallery was founded',
  },
  participation: {
    type: String,
    label: 'Participation in other fairs',
    optional: true,
    max: 2000,
    autoform: {
      type: 'textarea',
      rows: 5,
    },
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
  'contact.name': {
    type: String,
    label: 'Name',
  },
  'contact.email': {
    type: String,
    label: 'Email',
    regEx: SimpleSchema.RegEx.Email,
  },
  'contact.phone': {
    type: String,
    label: 'Mobile Phone',
  },
  galleryHistory: {
    type: String,
    label: 'Brief history of the gallery',
    max: 2000,
    autoform: {
      type: 'textarea',
      rows: 10,
    },
  },

  // Proposal
  standProposal: {
    type: String,
    label: 'Proposal for Material Art Fair 2016 stand',
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
    label: 'Artist name',
  },
  'artists.$.workTitle': {
    type: String,
    label: 'Work title',
  },
  'artists.$.medium': {
    type: String,
    label: 'Medium',
  },
  'artists.$.dimensions': {
    type: String,
    label: 'Dimensions',
  },
  'artists.$.year': {
    type: Number,
    label: 'Year',
  },
  boothType: {
    type: String,
    label: "Booth size",
    allowedValues: [
      'Project',
      'Small',
      'Medium',
      'Medium Plus',
      'Large',
    ],
  },
});
