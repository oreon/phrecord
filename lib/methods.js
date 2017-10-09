Meteor.methods({


    checkMsmt:function (msmtId){
        "use strict";
        let msmt = Measurements.findOne(msmtId)
        //console.log(msmt.patient);
        if(Meteor.isServer) {
            let patient = Patients.findOne(msmt.patient)
            let msmts = patient.msmtsByType(msmt.measurement)
            let last3 = _(msmts).take(3).value();

            let allup = _(last3).every(x => x.mainValue > 10)
            //console.log(allup)

            if (allup)
                return {level: 'warn'}
            else
                return {level: 'ok'}
        }
    }

})