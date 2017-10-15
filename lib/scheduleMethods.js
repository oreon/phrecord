/**
 * Created by jsingh on 2017-10-12.
 */

import
    moment
    from
        'moment'
import *
    as
    utils
    from
        '/imports/utils/misc.js';



if(Meteor.isServer) {

    var later = require('later')

    export const getPtCharts = (pt) => {
        console.log(Charts.findOne({name: 'Diabetes'}))
        console.log(pt)
        //console.log( _(pt.appliedCharts)
        //    .map(x => Charts.findOne({name: x}) )
        //    .value())
        return _(pt.appliedCharts)
            .map(x => Charts.findOne({name: x}))
            .map(x => utils.updateAssessmentStartDate(x, pt))
            .map('assesments')
            .flatten()
            .value()
    }

    let calcShedByItem = (item) => {
        //console.log(item)
        //later.parse.recur().every(2).
        //var text = `every ${item.frequency.every} ${item.frequency.type.toLowerCase()}s`;
        //var s = later.parse.text(text);
        //console.log(text)
        var s = later.parse.recur().every(item.frequency.every).dayOfYear();

        return {item: item, date: later.schedule(s, item.startDate).next(3)};
    }

    let calcShedFlat = (item) => {

        var s = later.parse.recur()
            .on(item.startDate)
            .every(item.frequency.every)
            .dayOfYear();


        ////console.log(listRetDates)

        // var s = later.parse.recur()
        //     .every(item.frequency.every)
        //     .dayOfYear();

        let dates = _.times(3, x => utils.timedOccurence(item, x))//later.schedule(s).next(3)
        return _(dates)
            .map(x => {
                return {item: item, date: x}
            })
            .value()
    }

    let calcShed = (item, isFlat) => {
        //console.log(item)

        if (!item.frequency.isRecurring) {
            return {item: item, date: utils.timedOccurence(item)}
        }

        // console.log('every ' + item.frequency.every + ' hours ')
        // var s = later.parse.text('every 18 days ');
        // console.log(later.schedule(s).next(3));

        return (isFlat) ? calcShedFlat(item) : calcShedByItem(item)
    }

    export const getEventsByDt = (pt) => _(getPtCharts(pt))
        .map(x => calcShed(x, true))
        .flatten()
        .sortBy('date')
        .value()

//

    Meteor.methods({

        getEvents: function (pt) {
            "use strict";

            return _(getPtCharts(pt))
                .map(x => calcShed(x))
                .value()

        }
        ,

        getEventsByDate: (pt) => {

            let items = getEventsByDt(pt)
            console.log(items)
            return items;
        }

    })

}