if (Meteor.isClient) {
  Session.setDefault("currentDate", new Date());


Template.body.helpers({
  date: function () {
    return moment(Session.get('currentDate')).format('MMMM Do YYYY');
  }
});

Template.body.events({
  "click #foo": function(event, template){

  }
});


 /*
  * Datepicker
  */
  Template.datepicker.rendered = function() {
    var pika = new Pikaday({ field: document.getElementById('datepicker') });
    pika.setMaxDate(Session.get('currentDate'));
  }
  Template.datepicker.helpers({
    currentDate: function() {
      return moment(Session.get('currentDate')).format('YYYY-MM-DD');
    }
  });
  Template.datepicker.events = {
    'change #datepicker' : function (e) {
      var now = moment();
      minute = now.format('mm');
      hour = now.format('HH');
      Session.set('currentDate', moment($(e.target).val()).hour(0).minute(0).toDate());
      Meteor.subscribe('2daysitems', Session.get('currentDate'));
    }
  }
}

if(Meteor.isCordova){
  Template.name.helpers({
    isMobile: true
  });
}
