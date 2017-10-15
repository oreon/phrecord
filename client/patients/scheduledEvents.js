


Template.scheduledEvents.onCreated(function () {
    var self = this;
    self.evts = new ReactiveVar([])
    self.evtsByDate = new ReactiveVar([])

    self.autorun(function () {
        "use strict";
        self.subscribe('patient');

        let pt = Patients.findOne()
        console.log(pt)
        if(pt) {
            Meteor.call('getEvents', pt, (error, response) => {
                if (error) {
                    Bert.alert(error.reason, "danger");
                } else {
                    self.evts.set(response)
                }
            })

            Meteor.call('getEventsByDate', pt ,(error, response) => {
                if (error) {
                    Bert.alert(error.reason, "danger");
                } else {
                    self.evtsByDate.set(response)
                }
            })
        }
    });


});

Template.scheduledEvents.helpers({

    patient: ()=> {
        let pt = Patients.findOne()
        console.log(pt.appliedCharts)
        return  Patients.findOne();
    },

    evts:() => Template.instance().evts.get(),
    evtsByDate:() => Template.instance().evtsByDate.get(),



})
