Applications = new Meteor.Collection('applications');

// Allow/Deny
Applications.allow({
  insert: function(userId, doc){
    return Roles.userIsInRole(userId, 'applicant');
  },

  update: function(userId, doc, fieldNames, modifier){
    //>>> this needs to deny the ability to edit the status field
    if (Roles.userIsInRole(userId, 'applicant') && doc.userId === userId) {
      return true;
    } else {
      return false;
    }
  },

  remove: function(userId, doc){
    return false;
  },
});

// Methods
//>>> all of these need auth checks. Allow/Deny rules have no effect on server
Meteor.methods({
  createApplication: function(application){
    return Applications.insert(application);
  },

  saveApplication: function(applicationId, applicationUpdate){
    return Applications.update(applicationId, applicationUpdate);
  },

  revertApplicationToEdit: function(applicationId){
    return Applications.update(applicationId, {$set: {status: 'saved',},});
  },

  submitApplication: function(applicationId){
    return Applications.update(applicationId, {$set: {status: 'submitted',},});
  },

  signApplication: function(applicationId, signatureData){
    return Applications.update(applicationId, {$set: {signature: signatureData, status: 'signed',},});
  },
});