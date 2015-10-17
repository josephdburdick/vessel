Template.users.onCreated(() => {
  Template.instance().subscribe('users');
});

Template.users.helpers({
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

Template.users.events({
  'change [name="userRole"]': (event, template) => {
    let role = $(event.target).find('option:selected').val();

    Meteor.call("setRoleOnUser", {
      user: event.target.getAttribute('data-userid'),
      role: role
    }, (error, response) => {
      if (error) {
        Bert.alert(error.reason, "warning");
      }
    });
  },
  'click .revoke-invite': ( event, template ) => {
    if (confirm("Are you sure? This is permanent.")) {
      Meteor.call("revokeInvitation", this._id, function(error, response) {
        if (error) {
          Bert.alert(error.reason, "warning");
        } else {
          Bert.alert("Invitation revoked!", "success");
        }
      });
    }
  }
});
