/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

// Filters

var filters = {

  myFilter: function () {
    this.next();
  },

  isLoggedIn: function() {
    if (! Meteor.userId()) {
      this.render('login');
    } else {
      this.next();
    }
  },

};

Router.onBeforeAction(filters.myFilter, {
  except: ['signup','login','forgot',],
});

// Routes

Router.map(function() {

  // Items

  this.route('items', {
    waitOn: function () {
      return Meteor.subscribe('allItems');
    },

    data: function () {
      return {
        items: Items.find(),
      };
    },
  });

  this.route('item', {
    path: '/items/:_id',
    waitOn: function () {
      return Meteor.subscribe('singleItem', this.params._id);
    },

    data: function () {
      return {
        item: Items.findOne(this.params._id),
      };
    },
  });

  // Pages

  this.route('homepage', {
    path: '/',
  });

  this.route('content');

  // Users

  this.route('login');

  this.route('signup');

  this.route('forgot');

  // Admin
  this.route('dashboard', {
    path: '/admin',
    waitOn: function() {
      return [
        Meteor.subscribe('adminUsers'),
        Meteor.subscribe('committeeUsers'),
      ];
    },

    data: function() {
      return {
        adminUsers: Roles.getUsersInRole('admin'),
        committeeUsers: Roles.getUsersInRole('committee'),
      };
    },
  });

  // Applications
  this.route('application', {
    path: '/application',
    waitOn: function() {
      return Meteor.subscribe('singleApplication', Meteor.userId());
    },

    data: function() {
      return Applications.findOne();
    },
  });

});
