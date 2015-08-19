
Template.addedmodal.helpers({
  number: function () {
    return Session.get('number');
  },
  movement: function () {
    return Session.get('selectedExercise');
  }
});
