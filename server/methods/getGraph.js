Meteor.methods({
  getGraph: function(date) {
    var daystart = moment(date).startOf('day').subtract(7,'days').startOf('day').toDate();
    var daysmovements = lookForMovements(7, date);
    var daystop = moment(date).startOf('day').endOf('day').toDate();
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

var lookForMovements = function(days, date) {
  while (typeof daysmovements === 'undefined' || daysmovements.count() === 0) {
    if (days === 0) {
      if (Movements.find().count() === 0) {
        Movements.insert({
          type: 'pushups',
          quantity: 0,
          date: new Date()
        });
      }
      return Movements.find();
    }
    daystart = moment(date).startOf('day').subtract(days,'days').startOf('day').toDate();
    var daysmovements = Movements.find({date: {
      $gte: daystart,
      $lte: moment(daystart).endOf('day').toDate()
    }});
    if (daysmovements.count() === 0) {
      return lookForMovements(days-1);
    }
  }
  return daysmovements;
}
