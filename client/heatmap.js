Session.setDefault("movementArray", []);
Template.heatmap.onRendered(function() {
  Tracker.autorun(function () {
    Session.set('movementArray', ReactiveMethod.call("getArrayGraph", Session.get('currentDate')));
    buildChart();
  });
});

var chart;
function buildChart() {
  console.log('rebuilding chart');
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
      data: Session.get('movementArray'),
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }]
  });
}
