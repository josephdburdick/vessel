Template.invites.onCreated(() => {
  Template.instance().subscribe('users');
});

Template.invites.helpers({
  users: () => {
    var users = Meteor.users.find();

    if (users) {
      return users;
    }
  },
  hasInvitations: () => {
    var invitations = Invitations.find().count();
    return invitations < 1 ? false : true;
  },
  invitations: () => {
    var invitations = Invitations.find();

    if (invitations) {
      return invitations;
    }
  }
});

Template.invites.events({
  'change [name="userRole"]': (event, template) => {
    let role = $(event.target).find('option:selected').val();

    Meteor.call('setRoleOnUser', {
      user: event.target.getAttribute('data-userid'),
      role: role
    }, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
      }
      if (!error) {
        Bert.alert(`Success! User role changed to ${Modules.client.toTitleCase(role)}.`, 'success');
      }
    });
  },
  'click .revoke-invite': function( event, template ) {
    if (confirm('Are you sure? This is permanent.')) {
      Meteor.call('revokeInvitation', this._id, function(error, response) {
        if (error) {
          Bert.alert(error.reason, 'warning');
        } else {
          Bert.alert('Invitation revoked!', 'success');
        }
      });
    }
  }
});
