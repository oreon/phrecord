Template.measurements.onCreated(function(){
	var self = this;
	self.autorun(function (){
		self.subscribe('patient');
	});
});

Template.measurements.helpers({
	shoppingList: ()=> {
		return Recipes.find({inMenu: true});
	},
	patient: ()=> {
		return Patients.findOne();
	}

});

Template.msmtTbl.helpers({

	settings: function () {
		return {
			collection: Patients,
			rowsPerPage: 10,
			showFilter: true,
			fields: ['firstName', 'lastName']
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