Meteor.publish( 'invite' , ( token ) => {
  check( token, String );
  return Invitations.find( { "token": token } );
});
