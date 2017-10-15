class ChartsCollection extends Mongo.Collection {

}

import moment from 'moment'
import { userFullName, userFullNameById, findInvTotal } from '/imports/utils/misc.js';

import { BaseSchema } from '/imports/api/schemas.js';


/*export const*/ Charts = new ChartsCollection('charts');

class PatientsCollection extends Mongo.Collection {

    // update(selector, modifier){

    // }

}


TestResultsSchema = new SimpleSchema([BaseSchema, {
    patient: {
        type: String,
        optional: true,
        autoform: {
            type: "hidden",
        },
    },
    admission: {
        type: String,
        optional: true,
        autoform: {
            type: "hidden",
        },
    },
    labTest: {
        type: String,
        optional: false,
        autoform: {
            type: "select",
            options: function () {
                return LabTests.find().map(function (c) {
                    return { label: c.name, value: c._id };
                });
            }
        }
    },
    mainValue: { type: Number, decimal: true, optional: true },
    values: { type: [Number], optional: true }
}
])

MeasurementSchema = new SimpleSchema([BaseSchema, {
    patient: {
        type: String,
        defaultValue:'unknown',
        autoform: {
            type: "hidden",
        },
    },
    measurement: {
        type: String,
        allowedValues: ['BP', 'Temperature', 'PO2', 'BGF', 'BGPP', 'Pulse', 'Breaths Per Minute',
            'Height','Weight','Head Circumference'
        ],
        autoform: {
            type: "hidden"
        },
    },
    mainValue: {
        type: Number,
        label: ' '
    },
    secondary: {
        type: Number,
        optional: true ,
        label: ' '
    },
   // values: { type: [TestResultValue], optional: true },
    source: {
        type: String,
        //defaultValue: 'P',
        allowedValues: ['A', 'E', 'P'],
        autoValue: () => 'P',
        autoform: {
            type: "hidden"
        },
    },
}])




PatientSchema = new SimpleSchema([BaseSchema, {
    firstName: {
        type: String,
        label: "First Name",
    },
    lastName: {
        type: String,
        label: "Last Name",
    },
    dob: {
        type: Date,
        label: 'Date of Birth'
    },
    gender: {
        type: String,
        allowedValues: ['F', 'M'],
        autoform: {
            type: "select-radio"
        }
    },
    contactPhone: {
        type: String,
        optional: true
    },
    pregnant: {
        type: Boolean,
        optional: true,
    },
    primaryPhysician: {
        type: String,
        optional: true,
        autoform: {
            type: "select",
            options: function () {
                users = Meteor.users.find({ 'profile.profession': 'physician' }, { sort: { 'profile.firstName': 1 } });
                return users.map(function (c) {
                    return { label: userFullNameById(c._id).fork(e => "drx", s => s), value: c._id };
                });
            }
        }
    },
    //chronicConditions: {
    //    type: [String],
    //    optional: true,
    //    autoform: {
    //        type: "select-checkbox",
    //        options: function () {
    //            return ChronicDiseases.find().map(function (c) {
    //                return { label: c.name, value: c.name };
    //            });
    //        }
    //    }
    //},

    pastMedicalHistory: {
        type: String,
        optional: true,
        autoform: {
            type: "textarea",
        }
    },
    socialHistory: {
        type: String,
        optional: true,
        autoform: {
            type: "textarea",
        }
    },
    permanentMeds: {
        type: [String],
        optional: true,
    },
    email: {
        type: String,
        optional: true,
    },
    bloodGroup: {
        type: String,
        optional: true,
        allowedValues: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
        , autoform: {
            type: "select-radio"
        }
    },
    appliedCharts: {
        type: [String],
        optional: true,
        autoform: {
            type: "select-checkbox",
            options: () => Charts.find({}/*, nameSorter*/).map(c => { return { label: c.name, value: c.name } })
        }
    },

   // drugAllergies: { type: [DrugAllergySchema], optional: true },
   // immunizations: { type: [ImmunizationSchema], optional: true },
   // orderedLabsAndImages: { type: LabsAndImagingSchema, optional: true },
   // measurements: {
   //     type: [MeasurementSchema],
   //     optional: true,
   // },

   // scheduledEventPerformed:{ type: [ScheduledEventPerformed], optional:true }

}])






/*export const*/ Patients = new PatientsCollection('patients')
/*export const*/  Measurements = new Mongo.Collection('measurements')
/*export const*/ TestResults = new Mongo.Collection('testResults')

Patients.attachSchema(PatientSchema)
TestResults.attachSchema(TestResultsSchema)
Measurements.attachSchema(MeasurementSchema)


Patients.allow({
    insert: (userId, doc) => !!userId,  //todo: should only allow user to update their own
    update: (userId, doc) => !!userId
})

Measurements.allow({
    insert: (userId, doc) => !!userId,  //todo: should only allow user to update their own
    update: (userId, doc) => !!userId
})


Patients.helpers({
    fullName: function () {
        return this.firstName + ' ' + this.lastName + ' ' + this.gender + ' ' + this.age();
    },
    age: function () {
        let years = moment().diff(this.dob, 'years');
        ret = years;
        if (years == 0) {
            ret = moment().diff(this.dob, 'days') + ' Days';
        }
        return ret;
    },
    currentBed: function () {
        adm = this.currentAdmisson();
        if (adm && adm.currentBedStay) {
            ////console.log("found bed " + adm.currentBedStay.bed)
            return Beds.findOne(adm.currentBedStay.bed);
        }
        return null
    },
    encounters: function () {
        return Encounters.find({ patient: this._id });
    },
    testResults: function () {
        TestResults.find({ patient: this._id });
    },
    isAdmitted: function () { return !!this.currentAdmisson() },
    currentAdmisson: function () {
        return Admissions.findOne({ patient: this._id, isCurrent: true });
    },
    admissions: function () {
        return Admissions.find({ patient: this._id }).fetch();
    },
    msmts: function () {
        return Measurements.find({ patient: this._id }).fetch();
    },

    msmtsByType: function (type) {
        return Measurements.find({ patient: this._id , measurement:type}, {sort: {createdAt: -1}}).fetch();
    }
})




if (Meteor.isServer) {

    Measurements.before.insert((userId, doc) => {
        console.log(Meteor.user().profile.patientId)
        pt = Patients.findOne({patientUniqueId : Meteor.user().profile.patientId})
        doc.patient = pt._id;
    });
}