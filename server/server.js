if (Meteor.isServer) {
  Meteor.methods({
    getGraph: function() {
      var pipeline = [
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
        },

      ];
      var res = Movements.aggregate(pipeline);
      return res;
    }
  });
}
