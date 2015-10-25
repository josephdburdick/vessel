Meteor.methods({
  revokeInvitation: function ( inviteId ) {
    check( inviteId, String );
    try{
     Invitations.remove( inviteId );
    } catch ( exception ) {
     return exception;
    }
  }
});
