function Donut(x, y, diameter, data, count, one) {
  this.x = x;
  this.y = y;
  this.diameter = diameter;

  //Starts animation
  var count = count;
  var number;

  this.draw = function(segments, labels, colors) {
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

      this.percentage(colors[i], i);
    }
  }

  //Shows percentage of each race
  this.percentage = function (color, i) {
    one.push();
    one.noStroke();
    one.fill(color);
    one.text(this.animate(i), 80*i + 50, one.height - 50);
    one.fill(255,255,255, 50);
    one.ellipse( 80*i + 50, one.height - 50, 30, 30);
    one.pop();
  }

  //Animates the numbers to increase the count when the company selected changes
  this.animate = function (i) {
    number = count;

    if (number >= (Math.round(data[i] * 10)/10)) {
      number = Math.round(data[i] * 10)/10;
    }

    return `${number}%`;
  }
  
  this.checkMouse = function (labels, colors) {
    var mouse_d = one.dist(this.x, this.y, one.mouseX, one.mouseY);

    for (var i = 0; i < labels.length; i++) {
      // Check if the mouse is inside the donut
      if (mouse_d < 100) {
        //Get the color of the donut
        var color_over = one.get(one.mouseX, one.mouseY);

        //Compare arrays! https://stackoverflow.com/questions/22395357/how-to-compare-two-arrays-are-equal-using-javascript
        if (color_over.toString() === colors[i].toString()) {
          one.noStroke();
          one.push();
          one.fill(colors[i]);
          one.text(labels[i], this.x, this.y);
          one.pop();
        }
      }
    }
  }
}
