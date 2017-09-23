Template.Header.onCreated(function(){
    var self = this;
    self.autorun(function (){
        self.subscribe('patient');
    });
});


Template.Header.helpers({
    currentUser: function() {
        if(Meteor.user())
            return Patients.findOne().firstName;
    }
});

Template.Header.events({
    'click  .logout': (e)=> {
        e.preventDefault();
        AccountsTemplates.logout();
    }
});