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


authenticatedRoutes.route('/users', {
  name: 'users',
  triggersEnter: [blockUnauthorizedAdmin],
  action () {
    BlazeLayout.render( 'default', { yield: 'users' });
  }
});

authenticatedRoutes.route('/managers', {
  name: 'managers',
  triggersEnter: [blockUnauthorizedAdmin],
  action () {
    BlazeLayout.render( 'default', { yield: 'managers' });
  }
});

authenticatedRoutes.route('/employees', {
  name: 'employees',
  triggersEnter: [blockUnauthorizedAdmin],
  action () {
    BlazeLayout.render( 'default', { yield: 'employees' });
  }
});
