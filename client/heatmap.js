Session.setDefault("movementArray", []);
Template.heatmap.onRendered(function() {
  Tracker.autorun(function () {
    var dataArr = ReactiveMethod.call("getArrayGraph", Session.get('currentDate'));
    Session.set('movementArray', dataArr);
    console.log(dataArr);
    buildChart(Session.get('movementArray'));
  });
});

var chart;
function buildChart(dataArray) {
  chart = $('#movementChart').highcharts({
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
      borderWidth: 1,
      data: dataArray,
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }]
  });



}
