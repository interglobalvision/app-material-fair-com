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

Meteor.publish('allApplications', function() {
  // >>> check user role is Admin / Committee
  return Applications.find();
});

Meteor.publish('ratings', function(userId) {
  check(userId, String);

  return Ratings.find({userId: userId,});
});

Meteor.publish('applicationRatings', function(userId) {
  check(userId, String);
  var application = Applications.findOne({userId: userId,});

  return Ratings.find({applicationId: application._id,});
});

Meteor.publish('comments', function(userId) {
  check(userId, String);

  var application = Applications.findOne({userId: userId,});

  // >>> check user role is Admin / Committee
  return Comments.find({applicationId: application._id,});
});
