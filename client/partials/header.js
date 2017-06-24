


Template.Header.helpers({
    currentUser: function() {
        if(Meteor.user())
        return Meteor.user().profile.patientId;
    }
});

Template.Header.events({
    'click  .logout': (e)=> {
        e.preventDefault();
        AccountsTemplates.logout();
    }
});