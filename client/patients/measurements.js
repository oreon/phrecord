Template.measurements.onCreated(function(){
	var self = this;
	self.autorun(function (){
		self.subscribe('patient');
		pt = Patients.findOne();
		if(pt)
			self.subscribe('measurements', pt._id)
	});
});

Template.measurements.helpers({

	patient: ()=> {
		return Patients.findOne();
	},

	measurements: function () {
		return Measurements.find();
	}

});

Template.msmtTbl.helpers({

	settings: function () {
		return {
			//collection: Measurements,
			rowsPerPage: 4,
			showFilter: true,

			fields: ['measurement', 'mainValue', createdAt]
		};
	}

})




Template.msmtTbl.events({
	'click .deleteMeasurement': function (event, template) {
		//console.log(this.id);
		//pt = FlowRouter.getParam('id')
		//patient = Patients.findOne({_id: pt});
        //
		//adm = Admissions.findOne({patient: pt, isCurrent: true})
		//console.log(adm)


		Meteor.call('admit', this,  function (error, response) {
			if (error) {
				Bert.alert(error.reason, "danger");
			} else {
				console.log(response)
				Bert.alert('Successfully removed measurement ', 'success', 'growl-top-right');
			}
		});

	}
})


AutoForm.hooks({

	insertBpForm: {
		formToDoc: function(doc) {
			console.log(doc)
			doc.measurement="BP"
			return doc;
		},

	},

	insertFG: {
		formToDoc: function(doc) {
			console.log(doc)
			doc.measurement="BGF"

			return doc;
		},
	},

	insertPPG: {
		formToDoc: function(doc) {
			doc.measurement="BGPP"
			return doc;
		},
	}

})