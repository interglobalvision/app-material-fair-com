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

// >>> probably better not to pass as array here but hook multiple times [if possible] then can have different exceptions
Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
      this.render('login');
    } else {
      this.next();
    }
  },

  {
    except: ['signup','homepage','forgot','welcome','application-closed',],
  }
);

// Routes

Router.map(function() {

  // Pages

  this.route('homepage', {
    path: '/',
  });

  this.route('welcome', {
    path: '/welcome', 
  });

  // Users

  this.route('login');

  this.route('signup', {
    path: '/signup',
    onBeforeAction: function() {
      if (!Meteor.userId()) {
        this.next();
      } else {
        Router.go('/');
      }
    },
  });

  this.route('forgot');

});
