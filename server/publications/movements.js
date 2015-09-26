Meteor.publish("movements", function(){
  var daystart = moment().startOf('day').subtract(10,'days').startOf('day').toDate();
  var daystop = moment().startOf('day').endOf('day').toDate();
  return Movements.find({
    // user: this.userId,
    date: {
      $gte: daystart,
      $lte: daystop
    }
  });
});
