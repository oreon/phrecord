import Highcharts from 'Highcharts'
import moment from 'moment'


Template.profile.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('patient');
    });
});


Template.profile.helpers({

    patient: ()=> {
        //console.log(Patients.findOne()).firstName
        return Patients.findOne();
    },

})
