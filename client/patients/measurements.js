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


AutoForm.hooks({

	insertBpForm: {
		formToDoc: function(doc) {
			console.log(doc)
			doc.measurement="BP"
			return doc;
		},

	},

	insertFastingGlucoseForm: {
		formToDoc: function(doc) {
			//console.log(doc)
			doc.measurement="Fasting-Sugar"
			return doc;
		},
	}

})