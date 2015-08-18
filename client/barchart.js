Template.barchart.rendered = function() {
  margin = {top: 20, right: 40, bottom: 30, left: 60},
      width = (window.innerWidth - 25) - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  var x0 = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var x1 = d3.scale.ordinal();

  var y = d3.scale.linear()
      .range([height, 0]);

  var color = d3.scale.ordinal()
      .range(["#2C6ABF", "#A4002E", "#ff8c00"]);

  var xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

  var svg = d3.select("#barchart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  Meteor.call('getGraph', function(err,res) {
    if (res) {
      var data = res;

      var exerciseNames = [];
      for (var i = 0; i < data[0].counts.length; i++) {
        exerciseNames.push(data[0].counts[i].type);
      }

      x0.domain(data.map(function(d) { return d._id; }));
      x1.domain(exerciseNames).rangeRoundBands([0, x0.rangeBand()]);
      y.domain([0, d3.max(data, function(d) { return d3.max(d.counts, function(d) {
        return d.count;
      }); })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Count");

      var day = svg.selectAll("._id")
          .data(data)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) {
            return "translate(" + x0(d._id) + ",0)";
          });

      day.selectAll("rect")
          .data(function(d) {
            return d.counts;
          })
        .enter().append("rect")
          .attr("width", (x1.rangeBand() / 1.05))
          .attr("x", function(d) { return x1(d.type); })
          .attr("y", function(d) { return y(d.count); })
          .attr("height", function(d) { return height - y(d.count); })
          .style("fill", function(d) { return color(d.type); });

      var legend = svg.selectAll(".legend")
          .data(exerciseNames.slice())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });

    }
  });


}
