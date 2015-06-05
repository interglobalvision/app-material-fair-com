/* ---------------------------------------------------- +/

## Applications ##

All code related to the Applications collection goes here. 

/+ ---------------------------------------------------- */

Applications = new Meteor.Collection('applications');

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
    Applications.insert(application);
  },

  removeApplication: function(application){
    if(can.removeApplication(Meteor.user(), application)){
      Applications.remove(application._id);
    }else{
      throw new Meteor.Error(403, 'You do not have the rights to delete this application.');
    }
  },

  saveApplication: function(application){
    if(can.createApplication(Meteor.user())){
      Applications.insert(application);
    }
  },
});
