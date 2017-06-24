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
		onSubmit: function (insertDoc, updateDoc, currentDoc) {
			console.log(updateDoc)
			this.done();
			return true;
		}
	},

	insertFastingGlucoseForm: {
		onSubmit: function (insertDoc, updateDoc, currentDoc) {
			console.log(updateDoc)

			this.done();
			return true;
		},
	}

})