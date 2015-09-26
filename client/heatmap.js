Session.setDefault("movementArray", []);
Template.heatmap.onRendered(function() {
  window.movementArray = [];
  Meteor.call('getGraph',Session.get('currentDate'), function(err,res) {
    if (err) {
      console.log(err.message);
    } else {
      // [date, type, number]
      res.forEach(function(item){
        item.counts.forEach(function(count){
          var miniarr = [];
          if (count.type === 'pushups') {
            miniarr.push(item._id);
            miniarr.push(0);
            miniarr.push(count.count);
          } else if (count.type === 'situps') {
            miniarr.push(item._id);
            miniarr.push(1);
            miniarr.push(count.count);
          } else if (count.type === 'pullups') {
            miniarr.push(item._id);
            miniarr.push(2);
            miniarr.push(count.count);
          } else if (count.type === 'squats') {
            miniarr.push(item._id);
            miniarr.push(3);
            miniarr.push(count.count);
          }
          movementArray.push(miniarr);
          movementArray.sort(compareSecondColumn);
          function compareSecondColumn(a, b) {
            if (a[1] === b[1]) {
              return 0;
            }
            else {
              return (a[1] < b[1]) ? -1 : 1;
            }
          }
        });

        movementArray.sort(sortFunction);

        function sortFunction(a, b) {
          if (a[0] === b[0]) {
            return 0;
          }
          else {
            return (a[0] < b[0]) ? -1 : 1;
          }
        }
      });
      Session.set('movementArray',movementArray);
    }
  });

});

Template.heatmap.topGenresChart = function() {
  // while (Session.get('movementArray').length === 0) {
    // setTimeout(function(){},200);
  // }
  return {
    chart: {
      type: 'heatmap',
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1
    },
    title: {
      text: 'Number of Exercises by Day'
    },
    yAxis: {
      categories: ['Pushups', 'Situps', 'Pullups', 'Squats'],
      title: null
    },
    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: Highcharts.getOptions().colors[0]
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280
    },
    tooltip: {
      formatter: function () {
        return  this.point.value + ' ' + this.series.yAxis.categories[this.point.y];
      }
    },
    series: [{
      name: 'Sales per employee',
      borderWidth: 1,
      data: Session.get('movementArray'),
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }]
  };
};
