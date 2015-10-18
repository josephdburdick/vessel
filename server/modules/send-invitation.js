let invitation = ( options ) => {
  _insertInvitation( options );

  let email = _prepareEmail( options.token );
  _sendInvitation( options.email, email );
};

let _insertInvitation = ( invite ) => {
  Invitations.insert( invite );
};

let _prepareEmail = ( token ) => {
  let domain = Meteor.settings.private.domain;
  let url    = `http://${ domain }/invite/${ token }`;
};

let _sendInvitation = ( email, content ) => {

};

Modules.server.sendInvitation = invitation;
