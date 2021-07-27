function Donut(x, y, diameter, one) {

  this.x = x;
  this.y = y;
  this.diameter = diameter;
  this.labelSpace = 30;

  // Later use - create labels? are those needed??
  // this.makeLegendItem = function (label, i, colour) {
  //   var x = this.x + 50 + this.diameter / 2;
  //   var y = this.y + (this.labelSpace * i) - this.diameter / 3;
  //   var boxWidth = this.labelSpace / 2;
  //   var boxHeight = this.labelSpace / 2;

  //   one.fill(colour);
  //   one.rect(x, y, boxWidth, boxHeight);

  //   one.fill('black');
  //   one.noStroke();
  //   one.textAlign('left', 'center');
  //   one.textSize(12);
  //   one.text(label, x + boxWidth + 10, y + boxWidth / 2);
  // };

  this.draw = function(segments, labels, colors, title) {
    one.noFill();
    one.strokeWeight(40);
    one.strokeCap(one.SQUARE);
    one.ellipseMode(one.RADIUS);
    one.textAlign(one.CENTER, one.CENTER);
    one.textSize(20);

    var total = 100;
    var start = 0;

  for (var i = 0; i < labels.length; i++) {
    one.stroke(colors[i]);
    var angle = segments[i] / total * one.TWO_PI;
    one.arc(this.x, this.y, this.diameter, this.diameter, start, start + angle);
    start += angle;
    }
  }
  
  this.checkMouse = function (labels, colors) {

    var mouseDist = one.dist(this.x, this.y, one.mouseX, one.mouseY);

    for (var i = 0; i < labels.length; i++) {
      // Check if the mouse is inside the donut
      if (mouseDist < 100) {
        //Get the color of the donut https://p5js.org/reference/#/p5.Image/get
        var colorOver = one.get(one.mouseX, one.mouseY);

        //Compare arrays! https://stackoverflow.com/questions/22395357/how-to-compare-two-arrays-are-equal-using-javascript
        if (colorOver.toString() === colors[i].toString()) {          
          one.push();
          one.noStroke();
          one.fill(colors[i]);
          one.text(`${labels[i]}`, this.x, this.y);
          one.pop();
        }
      }
    }
  }
}
