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

// >>> probably better not to pass as array here but hook multiple times [if possible] then can have different exceptions
Router.onBeforeAction(filters.myFilter, {
  except: ['signup','login','forgot',],
});

// Routes

Router.map(function() {

  // Pages

  this.route('homepage', {
    path: '/',
  });

  this.route('content');

  // Users

  this.route('login');

  this.route('signup');

  this.route('forgot');

});
