Template.invite.onCreated( () => {
  Template.instance().subscribe( 'invite', FlowRouter.current().params.token );
});

Template.invite.helpers({
  invitation: () => {
    let invite = Invitations.findOne();

    if ( invite ) {
      return invite;
    }
  }
});

Template.invite.events({
  'submit form': ( event, template ) => {
    event.preventDefault();

    let password = template.find('[name="password"]').value;

    let user = {
      email: template.find( '[name="emailAddress"]' ).value,
      password: Accounts._hashPassword( password ),
      token: FlowRouter.current().params.token
    };

    Meteor.call( 'acceptInvitation', user, ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        Meteor.loginWithPasword( user.email, password );
      }
    });
  }
});
