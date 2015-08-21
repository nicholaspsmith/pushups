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
     Session.set('currentDate', moment($(e.target).val()).tz("America/Chicago").toDate());
     Meteor.subscribe('2daysitems', Session.get('currentDate'));
   }
 }
