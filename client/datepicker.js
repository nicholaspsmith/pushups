/*
 * Datepicker
 */
 Template.datepicker.rendered = function() {
   $('#my-datepicker').datepicker();
   var pika = new Pikaday({
     field: document.getElementById('datepicker'),
     onSelect: function () {
       var date = this.getMoment();
       console.log(date);
       Session.set('currentDate', moment(date).tz("America/Chicago").toDate());
       Meteor.subscribe('2daysitems', Session.get('currentDate'));
     }
   });
   pika.setMaxDate(Session.get('currentDate'));
 }
 Template.datepicker.helpers({
   currentDate: function() {
     return moment(Session.get('currentDate')).format('YYYY-MM-DD');
   }
 });

 Template.datepicker.events({
   'click .day': function(e) {
     alert(e);
   }
 });
