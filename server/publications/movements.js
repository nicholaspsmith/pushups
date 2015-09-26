Meteor.publish("movements", function(){
  var daystart = moment().subtract(10,'days').startOf('day').toDate();
  var daystop = moment().endOf('day').toDate();
  return Movements.find({
    // user: this.userId,
    date: {
      $gte: daystart,
      $lte: daystop
    }
  });
});
