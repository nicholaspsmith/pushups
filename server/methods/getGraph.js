Meteor.methods({
  getGraph: function(date) {
    var daystart = moment(date).startOf('day').subtract(7,'days').startOf('day').toDate();
    var daysmovements = lookForMovements(7, date);
    var daystop = moment(date).startOf('day').endOf('day').toDate();
    var pipeline = [
      {
        $match: {
          // user: this.userId,
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
  },
  getArrayGraph: function(date) {
    var daystart = moment(date).startOf('day').subtract(7,'days').startOf('day').toDate();
    var daysmovements = lookForMovements(7, date);
    var daystop = moment(date).startOf('day').endOf('day').toDate();
    var pipeline = [
      {
        $match: {
          // user: this.userId,
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
    var movementArray = [];
    res.forEach(function(item){
      item.counts.forEach(function(count){
        var miniarr = [];
        if (count.type === 'pushups') {
          miniarr.push(item._id - 1);
          miniarr.push(0);
          miniarr.push(count.count);
        } else if (count.type === 'situps') {
          miniarr.push(item._id - 1);
          miniarr.push(1);
          miniarr.push(count.count);
        } else if (count.type === 'pullups') {
          miniarr.push(item._id - 1);
          miniarr.push(2);
          miniarr.push(count.count);
        } else if (count.type === 'squats') {
          miniarr.push(item._id - 1);
          miniarr.push(3);
          miniarr.push(count.count);
        }
        movementArray.push(miniarr);
      });
    });
    movementArray.sort(function(a,b) {
      if (a[0] == b[0])
        return a[1] < b[1] ? -1 : 1;
      return a[0] < b[0] ? -1 : 1;
    });
    
    return movementArray;
  },
  getSingleDayGraph: function(date) {
    var pipeline = [
      {
        $match: {
          // user: this.userId,
          date: {
            $gte: moment(date).startOf('day').toDate(),
            $lte: moment(date).endOf('day').toDate()
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
