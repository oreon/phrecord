class ChartsCollection extends Mongo.Collection {

}

import moment from 'moment'
import { userFullName, userFullNameById, findInvTotal } from '/imports/utils/misc.js';

import { BaseSchema } from '/imports/api/schemas.js';


/*export const*/ Charts = new ChartsCollection('charts');

class PatientsCollection extends Mongo.Collection {

}

MeasurementSchema = new SimpleSchema([BaseSchema, {
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
        optional: true ,
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

Patients = new PatientsCollection('patients')


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
    measurements: {
        type: [MeasurementSchema],
        optional: true,
    },


   // scheduledEventPerformed:{ type: [ScheduledEventPerformed], optional:true }

}])

Patients.attachSchema(PatientSchema)


Patients.allow({
    insert: (userId, doc) => !!userId,  //todo: should only allow user to update their own
    update: (userId, doc) => !!userId
})