Meteor.publish('recipes', function(){
	return Recipes.find({author: this.userId});
});

Meteor.publish('SingleRecipe', function(id){
	check(id, String);
	return Recipes.find({_id: id});
});

Meteor.publish('patient', function(){
	//check(id, String);
	let user = Meteor.users.findOne(this.userId)
	return Patients.find({patientUniqueId: user.profile.patientId });
});


Meteor.publish('measurements', function(patientId){
	check(patientId, String);
	return Measurements.find({patient: patientId});
});


