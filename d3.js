var margin = {
  top   : 0,
  left  : 120
}

var width = 980;
var height = 480;
var blocksize = 120;
  
d3.csv("score.csv",function(errer,data){
//console.log(data);

var Smax = Math.max.apply(null,data.map(function(d){return d.score }));//得点max
var Lmax = Math.max.apply(null,data.map(function(d){return d.lost })); //失点max

//console.log(Smax);
//console.log(Lmax);

var ScolorScale = d3.scale.linear().domain([0, Smax]).range(["#FFF5F2", "#FF4500"]); //カラースケールを作成
var LcolorScale = d3.scale.linear().domain([0, Lmax]).range(["#FFF5F2", "#FF4500"]); //カラースケールを作成

var svg = d3.select("#myGraph").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//ヒートマップ
var heatmap = svg.selectAll('g').data(data).enter();

    heatmap.append('rect')              
      .attr("class","block")
      .attr("x", function(d,i){return i * blocksize})
      .attr("y", blocksize)
      .attr("width",blocksize)
      .attr("height",blocksize)
      .attr("rx",100)
      .attr("ry",100)
      .attr("fill", function(d){ return ScolorScale(d.score); })
      .transition()
      .delay(function(d,i){return i * 100})
      .duration(2000)
      .ease("circle")
      .attr("rx",0)
      .attr("ry",0);

    heatmap.append('rect')              
      .attr("class","block")
      .attr("x", function(d,i){return i * blocksize})
      .attr("y", blocksize*2)
      .attr("width",blocksize)
      .attr("height",blocksize)
      .attr("rx",100)
      .attr("ry",100)
      .attr("fill", function(d){ return LcolorScale(d.lost); })
      .transition()
      .delay(function(d,i){return i * 100})
      .duration(2000)
      .ease("circle")
      .attr("rx",0)
      .attr("ry",0);


//テキスト
    heatmap.append('text')
      .text(function(d){return d.score})
      .attr("x", function(d,i){return i * blocksize})
      .attr("y", blocksize*1.5)
      .attr("text-anchor", "middle")
      .attr("fill", "#333")
      .attr("dy", ".35em")
      .attr("dx", blocksize/2)
      .style({"font-size":25});

    heatmap.append('text')
      .text(function(d){return d.lost})
      .attr("x", function(d,i){return i * blocksize})
      .attr("y", blocksize*2.5)
      .attr("text-anchor", "middle")
      .attr("fill", "#333")
      .attr("dy", ".35em")
      .attr("dx", blocksize/2)
      .style({"font-size":25});


//ラベル
var Labels = svg.selectAll(".Label")
          .data(data)
          .enter().append("text")
            .text(function (d) { return d.time; })
            .attr("y", 0)
            .attr("x", function (d, i) { return i * blocksize; })
            .attr("fill", "#333")
            .style({"font-size":15})
            .style("text-anchor", "middle")
            .attr("transform", "translate(60," + blocksize / 1.1 + ")");

var scLabels = svg.selectAll(".Label")
          .data(["得点","失点"])
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("fill", "#333")
            .attr("x", 0)
            .attr("y", function (d, i) { return i * blocksize; })
            .style({"font-size":15})
            .style("text-anchor", "end")
            .attr("transform", "translate(-20," + blocksize*1.6 + ")");

});