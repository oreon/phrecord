Meteor.methods({

  removeMeasurement: function (row, patientId){
      "use strict";
      Patients.update({_id: patientId}, {$pull: {'measurements': {'id': row}}});
  }

})