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
//Prevent app crashing for now:
let blockUnauthorizedAdmin = null,
    blockUnauthorizedManager = null;

authenticatedRoutes.route('/users', {
  name: 'users',
  triggersEnter: [blockUnauthorizedAdmin],
  action () {
    BlazeLayout.render( 'default', { yield: 'users' });
  }
});

authenticatedRoutes.route('/managers', {
  name: 'managers',
  triggersEnter: [blockUnauthorizedManager],
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
