Meteor.publish("movements", function(argument){
  var daystart = moment(new Date()).startOf('day').subtract(7,'days').startOf('day').toDate();
  var daystop = moment(new Date()).startOf('day').endOf('day').toDate();
  return Movements.find({
    date: {
      $gte: daystart,
      $lte: daystop
    }
  });
});
