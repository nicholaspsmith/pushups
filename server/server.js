Meteor.methods({
  getGraph: function(date) {
    var daystart = moment(date).subtract(5,'hours').subtract(7,'days').startOf('day').toDate();
    var daystop = moment(date).subtract(5,'hours').endOf('day').toDate();
    var pipeline = [
      {
        $match: {
          date: {
            $gte: daystart,
            $lte: daystop
          }
        }
      },
      {
        $group: {
          _id: {type: '$type', day: {$dayOfMonth: '$date'}},
          count: {$sum: '$quantity'}
        }
      },
      {
        $group: {
          _id: '$_id.day',
          counts: {$push: {
            type: '$_id.type',
            count: '$count'
          }}
        }
      }
    ];
    var res = Movements.aggregate(pipeline);
    return res;
  }
});

Meteor.publish("movements", function(argument){
  var daystart = moment(new Date()).subtract(5,'hours').subtract(7,'days').startOf('day').toDate();
  var daystop = moment(new Date()).subtract(5,'hours').endOf('day').toDate();
  return Movements.find({
    date: {
      $gte: daystart,
      $lte: daystop
    }
  });
});
