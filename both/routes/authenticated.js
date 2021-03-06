const blockUnauthorizedAdmin = ( context, redirect ) => {
 if ( Meteor.userId() && !Roles.userIsInRole( Meteor.userId(), 'admin' ) ) {
   Modules.both.redirectUser( { redirect: redirect } );
 }
};

const blockUnauthorizedManager = ( context, redirect ) => {
 if ( Meteor.userId() && !Roles.userIsInRole( Meteor.userId(), [ 'admin', 'manager' ] ) ) {
   Modules.both.redirectUser( { redirect: redirect } );
 }
};

const authenticatedRedirect = () => {
  if ( !Meteor.loggingIn() && !Meteor.userId() ) {
    FlowRouter.go( 'login' );
  }
};


const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [ authenticatedRedirect ]
});

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'index' } );
  }
});

authenticatedRoutes.route( '/dashboard', {
  name: 'dashboard',
  action() {
    BlazeLayout.render( 'default', { yield: 'dashboard' } );
  }
});


/*
 * User, Managers and Employees routes for Admin Panel
 */

authenticatedRoutes.route('/users', {
  name: 'users',
  triggersEnter: [ blockUnauthorizedAdmin ],
  action () {
    BlazeLayout.render( 'default', { yield: 'users' });
  }
});

authenticatedRoutes.route('/managers', {
  name: 'managers',
  triggersEnter: [ blockUnauthorizedManager ],
  action () {
    BlazeLayout.render( 'default', { yield: 'managers' });
  }
});

authenticatedRoutes.route('/employees', {
  name: 'employees',
  action () {
    BlazeLayout.render( 'default', { yield: 'employees' });
  }
});
