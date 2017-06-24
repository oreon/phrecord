

var hooksObject = {
    before: {
       // Replace `formType` with the form `type` attribute to which this hook applies
       update: function(doc) {
         // Potentially alter the doc
         doc.foo = 'bar';
         console.log(doc)

         // Then return it or pass it to this.result()
         return doc; (synchronous)
         //return false; (synchronous, cancel)
         //this.result(doc); (asynchronous)
         //this.result(false); (asynchronous, cancel)
       }
     },

  //   // The same as the callbacks you would normally provide when calling
  //   // collection.insert, collection.update, or Meteor.call
     after: {
       // Replace `formType` with the form `type` attribute to which this hook applies
         insertBpForm: function(error, result) { console.log(result)}
     },

     // Called when form does not have a `type` attribute
     onSubmit: function(insertDoc, updateDoc, currentDoc) {
       // You must call this.done()!
       console.log(updateDoc)
       this.done(); // submitted successfully, call onSuccess
       //this.done(new Error('foo')); // failed to submit, call onError with the provided error
       //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
     },

  // Called when any submit operation succeeds
  onSuccess: function (formType, result) {
    //Bert.alert( 'Successfully updated !', 'success', 'growl-top-right' );
    console.log(result)
  },

  // Called when any submit operation fails
  onError: function (formType, error) {
    if (error.error === 403)
      Bert.alert(error.reason, "danger");
    else
      console.error(error)
  },

  // Called every time an insert or typeless form
  // is revalidated, which can be often if keyup
  // validation is used.
     formToDoc: function(doc) {
         console.log(doc)
       // alter doc
       return doc;
     },

     // Called every time an update or typeless form
     // is revalidated, which can be often if keyup
     // validation is used.
     formToModifier: function(modifier) {
       console.log(modifier)
       // return modifier;
     },

  //   // Called whenever `doc` attribute reactively changes, before values
  //   // are set in the form fields.
  //   docToForm: function(doc, ss) {},

  //   // Called at the beginning and end of submission, respectively.
  //   // This is the place to disable/enable buttons or the form,
  //   // show/hide a "Please wait" message, etc. If these hooks are
  //   // not defined, then by default the submit button is disabled
  //   // during submission.
   //beginSubmit: function() { console.log("submitting")},
   // endSubmit: function() { console.log("endSubmit") }
};

AutoForm.addHooks(null, hooksObject);