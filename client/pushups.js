Meteor.subscribe("movements");

Session.set("currentDate", moment(new Date()).tz("America/Chicago").toDate());
Session.set("selectedExercise", 'pullups');
Session.set("number", 0);

Template.body.helpers({
  date: function () {
    return moment(Session.get('currentDate')).format('MMMM Do YYYY');
  },
  checkedIf: function (val) {
    if (Session.get('selectedExercise') === val) {
      return 'checked';
    }
  },
  currentNumber: function () {
    return Session.get('number');
  }
});

window.handle = null;
Template.body.events({
  'input input.qty': function (evt) {
    var self = this;
    if (handle) {
      clearTimeout(handle);
    }
    handle = setTimeout(function () {
      var qty = $(evt.target).val();
      if (qty==null){
        qty=0;
      };
      Session.set('number', Number(qty));
    }, 500);
  },
  'click .movement-selector button': function (e) {
    e.preventDefault();
    Session.set('selectedExercise', $(e.target).data('exercise'));
  },
  'click .quick-numbers button': function (e) {
    e.preventDefault();
    var num = parseInt($(e.target).html(),10);
    Session.set('number', num);
  },
  'submit form': function (e) {
    e.preventDefault();
    if (Session.get('number') > 0) {
      Movements.insert({
        user: Meteor.userId(),
        type: Session.get('selectedExercise'),
        quantity: Session.get('number'),
        date: moment(new Date()).tz("America/Chicago").toDate()
      });
      $('#addedmodal').modal('show');
      setTimeout(function(){
        $('#addedmodal').modal('hide');
        $('.qty').val(0);
        Session.set('number',0);
      }, 1000);
    }
  },
  'click [href="#dashboard"]': function() {
    var dateSet = Session.get('currentDate');
    Session.set('currentDate', moment(dateSet).subtract(1,'day').toDate());
    setTimeout(function(){
      Session.set('currentDate', dateSet);
    },75);
  }
});
