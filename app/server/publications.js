/* ---------------------------------------------------- +/

## Publications ##

All publications-related code. 

/+ ---------------------------------------------------- */

// Publish all items

Meteor.publish('allItems', function() {
  return Items.find();
});

// Publish a single item

Meteor.publish('singleItem', function(id) {
  return Items.find(id);
});

// Publish roles

Meteor.publish('allRoles', function (){ 
  return Meteor.roles.find({});
});

// ---- Applications 
// Publish a single item
Meteor.publish('singleApplication', function(userId) {
  return Applications.find({userId: userId,});
});
