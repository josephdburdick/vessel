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

  SSR.compileTemplate( 'invitation', Assets.getText( 'email/templates/invitation.html' ) );
  let html = SSR.render( 'invitation', { url: url } );
  return html;
};

let _sendInvitation = ( email, content ) => {
  Email.send({
    to: email,
    from: `${Meteor.settings.private.email.name} <${Meteor.settings.private.email.address}>`,
    subject: `You're invited to ${Meteor.settings.private.brand.name}`,
    html: content
  });
};

Modules.server.sendInvitation = invitation;
