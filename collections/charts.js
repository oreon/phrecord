Charts = new Mongo.Collection('Charts')

FrequencySchema = new SimpleSchema({
    every: {
        type: Number,
        label: "Times"
    },
    type: {
        allowedValues: ['Hour', 'Day', 'Week', 'Month', 'Quarter', 'Year'],
        type: String,
        label: "per ",
        defaultValue: 'Day'
    },
    isRecurring: {
        type: Boolean,
        defaultValue: true
    }
})

RecurringItemSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name of the measurement e.g Blood Pressure, Blood Sugar etc'
    },
    frequency: {
        type: FrequencySchema,
    },
    instructions: { type: String, optional: true },
    startDate: {
        type: Date,
        optional: true,
        label: "Start Date (Leave empty for now)",
        autoValue: function () { if (!this.value) return new Date(); }
    },
    type: {
        type: String,
        defaultValue: 'A',
        allowedValues: ['I', 'A', 'P']
    }
})

ChartSchema = new SimpleSchema({
    name: { type: String },
    startFromBirthDate: { type: Boolean, defaultValue: false },
    assesments: {
        type: [RecurringItemSchema],
        //optional: true,
        // autoValue: function () {
        //     return utils.massageScriptItems(this.value);
        // },
    },
})

Charts.attachSchema(ChartSchema)