let accept = ( options ) => {
  let invite = _getInvitation( options.token );
  let user = _createUser( options );

  _addUserToTole( user, invite.role );
  _deleteInvite( invite._id );

  return user;
};

let _createUser = ( options ) => {
  let userId = Accounts.createUser( { email: options.email, password: options.password } );

  if (userId) {
    return userId;
  }
};

let _getInvitation = ( token ) => {
  let invitation = Invitations.findOne( { "token": token } );

  if ( invitation ) {
    return invitation;
  }
};

let _deleteInvite = ( invite ) => {
  Invitations.remove( { "_id": invite } );
};

let _addUserToRole = ( user, role ) => {
  Roles.setUserRoles( user, role );
};

Modules.server.acceptInvitation = accept;
