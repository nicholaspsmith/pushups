Meteor.subscribe("movements");

Session.set("currentDate", new Date());
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
  },
  movements: function (type) {
    if (typeof type === 'undefined') {
      type = ['pushups','pullups','situps'];
    } else {
      type = Array(type);
    }
    var date = Session.get('currentDate');
    var gtDate = moment(date).startOf('day').toDate();
    var ltDate = moment(date).endOf('day').toDate();
    return Movements.find({
      type: { $in: type },
      date: {
        $gte: gtDate,
        $lte: ltDate
      }
    });
  },
  total: function (type) {
    if (typeof type === 'undefined') {
      type = ['pushups','pullups','situps'];
    } else {
      type = Array(type);
    }

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
        type: Session.get('selectedExercise'),
        quantity: Session.get('number'),
        date: new Date()
      });
      $('#addedmodal').modal('show');
      setTimeout(function(){
        $('#addedmodal').modal('hide');
        $('.qty').val(0);
        Session.set('number',0);
      }, 1000);
    }
  }
});
