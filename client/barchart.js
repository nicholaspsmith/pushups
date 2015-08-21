Template.barchart.rendered = function() {
  Meteor.setInterval(function(){
    Meteor.call('getGraph', Session.get('currentDate'), function(err,res) {
      if (err) {
        console.error(err);
      } else {
        var data = res;

        margin = {top: 20, right: 40, bottom: 30, left: 60},
            width = (window.innerWidth - 25) - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        var x0 = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var x1 = d3.scale.ordinal();

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.ordinal()
            .range(["#0D1629", "#192757", "#3B66BF", "#345AA8", "#4577E0"]);

        var xAxis = d3.svg.axis()
            .scale(x0)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format(".2s"));

        // delete the old one before adding new one
        d3.select('svg').remove();

        //
        window.svg = d3.select("#barchart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        function compare(a,b) {
          if (a._id < b._id)
            return -1;
          if (a._id > b._id)
            return 1;
          return 0;
        }
        data = data.sort(compare);

        // var exerciseNames = [];
        // for (var i = 0; i < data[0].counts.length; i++) {
        //   exerciseNames.push(data[0].counts[i].type);
        // }
        var exerciseNames = ['pullups','pushups','situps','squats'];

        var max = 0;
        x0.domain(data.map(function(d) {  return d._id; }));
        x1.domain(exerciseNames).rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(data, function(d) {
          max = d3.max(d.counts, function(d) {
            return d.count;
          });
          return max;
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append('text')
            .attr('x',20)
            .attr('y',16)
            .style('text-anchor','end')
            .text('Day');

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Count");

        var numticks = max / 5;
        svg.selectAll("line.horizontalGrid").data(y.ticks(numticks)).enter()
        .append("line")
          .attr({
              "class":"horizontalGrid",
              "x1" : 1,
              "x2" : width,
              "y1" : function(d){ return y(d);},
              "y2" : function(d){ return y(d);},
              "fill" : "none",
              "shape-rendering" : "crispEdges",
              "stroke" : "#ccc",
              "stroke-width" : "1px"
          }
        );

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
            .attr("width", (x1.rangeBand() / 1.0))
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
            .attr("dy", ".3em")
            .attr("font-size","16px")
            .style("text-anchor", "end")
            .attr("fill","#F6A321")
            .text(function(d) { return d; });
      }
    })
  }, 500);
}
