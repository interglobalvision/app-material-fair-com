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
  country: {
    type: String,
    allowedValues: [
      'Afghanistan',
      'Åland Islands',
    ],
    autoform: {
      type: "select",
      options: function () {
        return [
          {value: "Afghanistan", label: "Afghanistan",},
          {value: "Åland Islands", label: "Åland Islands",},
          {value: "Albania", label: "Albania",},
          {value: "Algeria", label: "Algeria",},
          {value: "American Samoa", label: "American Samoa",},
          {value: "Andorra", label: "Andorra",},
          {value: "Angola", label: "Angola",},
          {value: "Anguilla", label: "Anguilla",},
          {value: "Antarctica", label: "Antarctica",},
          {value: "Antigua and Barbuda", label: "Antigua and Barbuda",},
          {value: "Argentina", label: "Argentina",},
          {value: "Armenia", label: "Armenia",},
          {value: "Aruba", label: "Aruba",},
          {value: "Australia", label: "Australia",},
          {value: "Austria", label: "Austria",},
          {value: "Azerbaijan", label: "Azerbaijan",},
          {value: "Bahamas", label: "Bahamas",},
          {value: "Bahrain", label: "Bahrain",},
          {value: "Bangladesh", label: "Bangladesh",},
          {value: "Barbados", label: "Barbados",},
          {value: "Belarus", label: "Belarus",},
          {value: "Belgium", label: "Belgium",},
          {value: "Belize", label: "Belize",},
          {value: "Benin", label: "Benin",},
          {value: "Bermuda", label: "Bermuda",},
          {value: "Bhutan", label: "Bhutan",},
          {value: "Bolivia, Plurinational State of", label: "Bolivia, Plurinational State of",},
          {value: "Bonaire, Sint Eustatius and Saba", label: "Bonaire, Sint Eustatius and Saba",},
          {value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina",},
          {value: "Botswana", label: "Botswana",},
          {value: "Bouvet Island", label: "Bouvet Island",},
          {value: "Brazil", label: "Brazil",},
          {value: "British Indian Ocean Territory", label: "British Indian Ocean Territory",},
          {value: "Brunei Darussalam", label: "Brunei Darussalam",},
          {value: "Bulgaria", label: "Bulgaria",},
          {value: "Burkina Faso", label: "Burkina Faso",},
          {value: "Burundi", label: "Burundi",},
          {value: "Cambodia", label: "Cambodia",},
          {value: "Cameroon", label: "Cameroon",},
          {value: "Canada", label: "Canada",},
          {value: "Cape Verde", label: "Cape Verde",},
          {value: "Cayman Islands", label: "Cayman Islands",},
          {value: "Central African Republic", label: "Central African Republic",},
          {value: "Chad", label: "Chad",},
          {value: "Chile", label: "Chile",},
          {value: "China", label: "China",},
          {value: "Christmas Island", label: "Christmas Island",},
          {value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands",},
          {value: "Colombia", label: "Colombia",},
          {value: "Comoros", label: "Comoros",},
          {value: "Congo", label: "Congo",},
          {value: "Congo, the Democratic Republic of the", label: "Congo, the Democratic Republic of the",},
          {value: "Cook Islands", label: "Cook Islands",},
          {value: "Costa Rica", label: "Costa Rica",},
          {value: "Côte d'Ivoire", label: "Côte d'Ivoire",},
          {value: "Croatia", label: "Croatia",},
          {value: "Cuba", label: "Cuba",},
          {value: "Curaçao", label: "Curaçao",},
          {value: "Cyprus", label: "Cyprus",},
          {value: "Czech Republic", label: "Czech Republic",},
          {value: "Denmark", label: "Denmark",},
          {value: "Djibouti", label: "Djibouti",},
          {value: "Dominica", label: "Dominica",},
          {value: "Dominican Republic", label: "Dominican Republic",},
          {value: "Ecuador", label: "Ecuador",},
          {value: "Egypt", label: "Egypt",},
          {value: "El Salvador", label: "El Salvador",},
          {value: "Equatorial Guinea", label: "Equatorial Guinea",},
          {value: "Eritrea", label: "Eritrea",},
          {value: "Estonia", label: "Estonia",},
          {value: "Ethiopia", label: "Ethiopia",},
          {value: "Falkland Islands (Malvinas)", label: "Falkland Islands (Malvinas)",},
          {value: "Faroe Islands", label: "Faroe Islands",},
          {value: "Fiji", label: "Fiji",},
          {value: "Finland", label: "Finland",},
          {value: "France", label: "France",},
          {value: "French Guiana", label: "French Guiana",},
          {value: "French Polynesia", label: "French Polynesia",},
          {value: "French Southern Territories", label: "French Southern Territories",},
          {value: "Gabon", label: "Gabon",},
          {value: "Gambia", label: "Gambia",},
          {value: "Georgia", label: "Georgia",},
          {value: "Germany", label: "Germany",},
          {value: "Ghana", label: "Ghana",},
          {value: "Gibraltar", label: "Gibraltar",},
          {value: "Greece", label: "Greece",},
          {value: "Greenland", label: "Greenland",},
          {value: "Grenada", label: "Grenada",},
          {value: "Guadeloupe", label: "Guadeloupe",},
          {value: "Guam", label: "Guam",},
          {value: "Guatemala", label: "Guatemala",},
          {value: "Guernsey", label: "Guernsey",},
          {value: "Guinea", label: "Guinea",},
          {value: "Guinea-Bissau", label: "Guinea-Bissau",},
          {value: "Guyana", label: "Guyana",},
          {value: "Haiti", label: "Haiti",},
          {value: "Heard Island and McDonald Islands", label: "Heard Island and McDonald Islands",},
          {value: "Holy See (Vatican City State)", label: "Holy See (Vatican City State)",},
          {value: "Honduras", label: "Honduras",},
          {value: "Hong Kong", label: "Hong Kong",},
          {value: "Hungary", label: "Hungary",},
          {value: "Iceland", label: "Iceland",},
          {value: "India", label: "India",},
          {value: "Indonesia", label: "Indonesia",},
          {value: "Iran, Islamic Republic of", label: "Iran, Islamic Republic of",},
          {value: "Iraq", label: "Iraq",},
          {value: "Ireland", label: "Ireland",},
          {value: "Isle of Man", label: "Isle of Man",},
          {value: "Israel", label: "Israel",},
          {value: "Italy", label: "Italy",},
          {value: "Jamaica", label: "Jamaica",},
          {value: "Japan", label: "Japan",},
          {value: "Jersey", label: "Jersey",},
          {value: "Jordan", label: "Jordan",},
          {value: "Kazakhstan", label: "Kazakhstan",},
          {value: "Kenya", label: "Kenya",},
          {value: "Kiribati", label: "Kiribati",},
          {value: "Korea, Democratic People's Republic of", label: "Korea, Democratic People's Republic of",},
          {value: "Korea, Republic of", label: "Korea, Republic of",},
          {value: "Kuwait", label: "Kuwait",},
          {value: "Kyrgyzstan", label: "Kyrgyzstan",},
          {value: "Lao People's Democratic Republic", label: "Lao People's Democratic Republic",},
          {value: "Latvia", label: "Latvia",},
          {value: "Lebanon", label: "Lebanon",},
          {value: "Lesotho", label: "Lesotho",},
          {value: "Liberia", label: "Liberia",},
          {value: "Libya", label: "Libya",},
          {value: "Liechtenstein", label: "Liechtenstein",},
          {value: "Lithuania", label: "Lithuania",},
          {value: "Luxembourg", label: "Luxembourg",},
          {value: "Macao", label: "Macao",},
          {value: "Macedonia, the former Yugoslav Republic of", label: "Macedonia, the former Yugoslav Republic of",},
          {value: "Madagascar", label: "Madagascar",},
          {value: "Malawi", label: "Malawi",},
          {value: "Malaysia", label: "Malaysia",},
          {value: "Maldives", label: "Maldives",},
          {value: "Mali", label: "Mali",},
          {value: "Malta", label: "Malta",},
          {value: "Marshall Islands", label: "Marshall Islands",},
          {value: "Martinique", label: "Martinique",},
          {value: "Mauritania", label: "Mauritania",},
          {value: "Mauritius", label: "Mauritius",},
          {value: "Mayotte", label: "Mayotte",},
          {value: "Mexico", label: "Mexico",},
          {value: "Micronesia, Federated States of", label: "Micronesia, Federated States of",},
          {value: "Moldova, Republic of", label: "Moldova, Republic of",},
          {value: "Monaco", label: "Monaco",},
          {value: "Mongolia", label: "Mongolia",},
          {value: "Montenegro", label: "Montenegro",},
          {value: "Montserrat", label: "Montserrat",},
          {value: "Morocco", label: "Morocco",},
          {value: "Mozambique", label: "Mozambique",},
          {value: "Myanmar", label: "Myanmar",},
          {value: "Namibia", label: "Namibia",},
          {value: "Nauru", label: "Nauru",},
          {value: "Nepal", label: "Nepal",},
          {value: "Netherlands", label: "Netherlands",},
          {value: "New Caledonia", label: "New Caledonia",},
          {value: "New Zealand", label: "New Zealand",},
          {value: "Nicaragua", label: "Nicaragua",},
          {value: "Niger", label: "Niger",},
          {value: "Nigeria", label: "Nigeria",},
          {value: "Niue", label: "Niue",},
          {value: "Norfolk Island", label: "Norfolk Island",},
          {value: "Northern Mariana Islands", label: "Northern Mariana Islands",},
          {value: "Norway", label: "Norway",},
          {value: "Oman", label: "Oman",},
          {value: "Pakistan", label: "Pakistan",},
          {value: "Palau", label: "Palau",},
          {value: "Palestinian Territory, Occupied", label: "Palestinian Territory, Occupied",},
          {value: "Panama", label: "Panama",},
          {value: "Papua New Guinea", label: "Papua New Guinea",},
          {value: "Paraguay", label: "Paraguay",},
          {value: "Peru", label: "Peru",},
          {value: "Philippines", label: "Philippines",},
          {value: "Pitcairn", label: "Pitcairn",},
          {value: "Poland", label: "Poland",},
          {value: "Portugal", label: "Portugal",},
          {value: "Puerto Rico", label: "Puerto Rico",},
          {value: "Qatar", label: "Qatar",},
          {value: "Réunion", label: "Réunion",},
          {value: "Romania", label: "Romania",},
          {value: "Russian Federation", label: "Russian Federation",},
          {value: "Rwanda", label: "Rwanda",},
          {value: "Saint Barthélemy", label: "Saint Barthélemy",},
          {value: "Saint Helena, Ascension and Tristan da Cunha", label: "Saint Helena, Ascension and Tristan da Cunha",},
          {value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis",},
          {value: "Saint Lucia", label: "Saint Lucia",},
          {value: "Saint Martin (French part)", label: "Saint Martin (French part)",},
          {value: "Saint Pierre and Miquelon", label: "Saint Pierre and Miquelon",},
          {value: "Saint Vincent and the Grenadines", label: "Saint Vincent and the Grenadines",},
          {value: "Samoa", label: "Samoa",},
          {value: "San Marino", label: "San Marino",},
          {value: "Sao Tome and Principe", label: "Sao Tome and Principe",},
          {value: "Saudi Arabia", label: "Saudi Arabia",},
          {value: "Senegal", label: "Senegal",},
          {value: "Serbia", label: "Serbia",},
          {value: "Seychelles", label: "Seychelles",},
          {value: "Sierra Leone", label: "Sierra Leone",},
          {value: "Singapore", label: "Singapore",},
          {value: "Sint Maarten (Dutch part)", label: "Sint Maarten (Dutch part)",},
          {value: "Slovakia", label: "Slovakia",},
          {value: "Slovenia", label: "Slovenia",},
          {value: "Solomon Islands", label: "Solomon Islands",},
          {value: "Somalia", label: "Somalia",},
          {value: "South Africa", label: "South Africa",},
          {value: "South Georgia and the South Sandwich Islands", label: "South Georgia and the South Sandwich Islands",},
          {value: "South Sudan", label: "South Sudan",},
          {value: "Spain", label: "Spain",},
          {value: "Sri Lanka", label: "Sri Lanka",},
          {value: "Sudan", label: "Sudan",},
          {value: "Suriname", label: "Suriname",},
          {value: "Svalbard and Jan Mayen", label: "Svalbard and Jan Mayen",},
          {value: "Swaziland", label: "Swaziland",},
          {value: "Sweden", label: "Sweden",},
          {value: "Switzerland", label: "Switzerland",},
          {value: "Syrian Arab Republic", label: "Syrian Arab Republic",},
          {value: "Taiwan, Province of China", label: "Taiwan, Province of China",},
          {value: "Tajikistan", label: "Tajikistan",},
          {value: "Tanzania, United Republic of", label: "Tanzania, United Republic of",},
          {value: "Thailand", label: "Thailand",},
          {value: "Timor-Leste", label: "Timor-Leste",},
          {value: "Togo", label: "Togo",},
          {value: "Tokelau", label: "Tokelau",},
          {value: "Tonga", label: "Tonga",},
          {value: "Trinidad and Tobago", label: "Trinidad and Tobago",},
          {value: "Tunisia", label: "Tunisia",},
          {value: "Turkey", label: "Turkey",},
          {value: "Turkmenistan", label: "Turkmenistan",},
          {value: "Turks and Caicos Islands", label: "Turks and Caicos Islands",},
          {value: "Tuvalu", label: "Tuvalu",},
          {value: "Uganda", label: "Uganda",},
          {value: "Ukraine", label: "Ukraine",},
          {value: "United Arab Emirates", label: "United Arab Emirates",},
          {value: "United Kingdom", label: "United Kingdom",},
          {value: "United States", label: "United States",},
          {value: "United States Minor Outlying Islands", label: "United States Minor Outlying Islands",},
          {value: "Uruguay", label: "Uruguay",},
          {value: "Uzbekistan", label: "Uzbekistan",},
          {value: "Vanuatu", label: "Vanuatu",},
          {value: "Venezuela, Bolivarian Republic of", label: "Venezuela, Bolivarian Republic of",},
          {value: "Viet Nam", label: "Viet Nam",},
          {value: "Virgin Islands, British", label: "Virgin Islands, British",},
          {value: "Virgin Islands, U.S.", label: "Virgin Islands, U.S.",},
          {value: "Wallis and Futuna", label: "Wallis and Futuna",},
          {value: "Western Sahara", label: "Western Sahara",},
          {value: "Yemen", label: "Yemen",},
          {value: "Zambia", label: "Zambia",},
          {value: "Zimbabwe", label: "Zimbabwe",},
        ];
      },
    },
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
  single: {
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
  double: {
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
  small: {
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
  medium: {
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
  mediumPlus: {
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
  large: {
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
  extraLarge: {
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