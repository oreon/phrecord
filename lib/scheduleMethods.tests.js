import { Meteor } from 'meteor/meteor';
//import { Factory } from 'meteor/factory';
//import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
//import { _ } from 'lodash';
import {Patients} from '../collections/patients'
import * as sm from './scheduleMethods';

_ = lodash

Factory.define('patient', Patients, {
    lastName: () => 'singh',
    firstName: () =>  'jag',
    createdAt: () => new Date(),
    dob:() => new Date(),
    gender: ()=> 'M',
    appliedCharts:() => ['Diabetes']

});


if (Meteor.isServer) {
    // eslint-disable-next-line import/no-unresolved
//import './server/publications.js';

    describe('patients', function () {
        describe('mutators', function () {
            it('builds correctly from factory', function () {
                const todo = Factory.create('patient');
                assert.typeOf(todo, 'object');
                assert.typeOf(todo.createdAt, 'date');
            });

            it('creates correct chart dates', function () {
                const pt = Factory.create('patient');

                const getEvents = sm.getPtCharts(pt)
                console.log(getEvents)
                assert(getEvents != null)

            });


            it('creates correct chart dates', function () {
                const pt = Factory.create('patient');

                const getEvents = sm.getEventsByDt(pt)
                console.log(getEvents)
                assert(getEvents.length > 1 )

            });


        });
    })


}