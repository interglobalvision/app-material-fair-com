/* ---------------------------------------------------- +/

## Publications ##

All publications-related code.

/+ ---------------------------------------------------- */

// Publish users

Meteor.publish('allUsers', function (){
  return Meteor.users.find();
});

// Publish roles

Meteor.publish('allRoles', function (){
  return Meteor.roles.find({});
});

// Publish admin users

Meteor.publish('adminUsers', function (){
	return Roles.getUsersInRole('admin');
});

// Publish committee users

Meteor.publish('committeeUsers', function (){
	return Roles.getUsersInRole('committee');
});

// ---- Applications
// Publish a single item
Meteor.publish('singleApplication', function(userId) {
  return Applications.find({userId: userId,});
});

Meteor.publish('allApplications', function(userId) {
  // >>> check user role is Admin / Committee
  return Applications.find();
});
