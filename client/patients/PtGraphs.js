import Highcharts from 'Highcharts'
import moment from 'moment'

export const applyChartData = (testsByType, msmts, template) => {

    //console.log(testsByType)
    //console.log(msmts)

    _.forOwn()

    let msMap = msmtGraphs(msmts)

    for (var [key, value] of msMap) {
        if(key)
            template.mapResults.get().set(key, value);
    }

    if(testsByType ) {
        let tstMap = tstGraphs(testsByType)

        for (var [key, value] of tstMap) {
            template.mapResults.get().set(key, value);
        }
    }


}

export const msmtGraphs = (msmts) => {

    let mapResults = new Map();
    _.forOwn(msmts, function (val, key) {
        let arr = [];

        _.forEach(val, function (elem) {

            if (elem.mainValue) {
                arr.push([moment(elem.updatedAt).format("DD-MM-YY hh:mm"), elem.mainValue])
            }
        })

        //console.log(arr)
        mapResults.set(key, arr);
    });
    return mapResults;
}

export const tstGraphs = (testsByType) => {
    let subTests = [];
    let mapResults = new Map();

    _.forOwn(testsByType, function (val, key) {

        arr = []

        _.forEach(val, function (elem) {
            if (elem.mainValue) {
                //format();
                arr.push([moment(elem.createdAt).format("DD-MM-YY hh:mm"), elem.mainValue])
                mapResults.set(key, arr);
            }
            else {
                subTests.push(elem.values);
            }
        })
    });

    ////console.log(Template.instance().mapResults.get())
    subTests = _.flatten(subTests)
    ////console.log(subTests)

    testsByType = _.groupBy(subTests, function (a) { return a.name })

    _.forOwn(testsByType, function (vals, key) {
        arr = []
        ////console.log("chart si " + key);
        _.forEach(vals, function (elem) {
            arr.push([moment(elem.createdAt).format("DD-MM-YY hh:mm"), elem.value])
        })
        mapResults.set(key, arr);
    })

    return mapResults
}

Template.PtGraphs.onCreated(function () {
    var self = this;
    this.mapResults = new ReactiveVar(new Map());
    self.autorun(function () {
        self.subscribe('patient');
        pt = Patients.findOne()
        if(pt)
            self.subscribe('measurements', pt._id)
        //Session.set('patient', Patients.findOne());
    });
});




Template.PtGraphs.helpers({

    patient: ()=> {
        pt =  Patients.findOne();
        console.log(pt.msmts())
        return pt;
    },

    createChartData: function (adm) {

        //let testResults = TestResults.find({ admission: adm._id }).fetch();
        //let testsByType = _.groupBy(testResults, function (a) { return a.labTestName() })
        let msmts = _.groupBy(adm.measurements, function (a) { return a.measurement })
        let testsByType = null

        console.log(msmts)

        applyChartData(testsByType, msmsts ,Template.instance())

    },

    createChartDataPt: function (patient) {

        let testResults = TestResults.find({ patient: patient._id }).fetch();
        let testsByType = _.groupBy(testResults, function (a) { return a.labTestName() })
        let msmts = _.groupBy(patient.msmts(), a => a.measurement )

        applyChartData( testsByType, msmts, Template.instance())
    },

    chartNames: function () {
        let mr = Template.instance().mapResults.get();
        return Array.from(mr.keys())
    },

    drawChart: function (key) {
        if(!key)
            return;
        mapResults = Template.instance().mapResults.get();

        Meteor.defer(function () {

            data = mapResults.get(key)
            cats = []

            _.forEach(data, function (elem) {
                if(elem)
                    cats.push(elem[0])
            })

            //console.log(`${key}: ${value}`)
            Highcharts.chart(key, {
                title: {
                    text: key
                },

                xAxis: {
                    categories: cats,
                    labels: {
                        //format: '{value:%Y-%m-%d %H:%M}',
                        rotation: 35,
                        align: 'left'
                    },

                    //type: 'datetime',
                    // labels: {
                    //     format: '{value:%Y-%m-%d %H:%M}',
                    //     rotation: 35,
                    //     align: 'left'
                    // },
                    // dateTimeLabelFormats: { // don't display the dummy year
                    //     month: '%e. %b',
                    //     year: '%b'
                    // },
                    title: {
                        text: 'Date Uploaded'
                    }
                },

                plotOptions: {
                    series: {
                        zones: [{
                            value: 0,
                            className: 'zone-1'
                        }, {
                            value: 10,
                            className: 'zone-2'
                        },
                            {value: 15,
                            className: 'zone-0'
                        }
                        ],
                        //threshold: 15
                    }
                },

                series: [{
                    type: 'line',
                    data: data,
                    name: key,
                }]
            });
            //}
        })
    },
})
