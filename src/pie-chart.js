function PieChart(x, y, diameter, one) {

  this.x = x;
  this.y = y;
  this.diameter = diameter;
  this.labelSpace = 30;

  this.get_radians = function (data) {
    var total = sum(data);
    var radians = [];

    for (let i = 0; i < data.length; i++) {
      radians.push((data[i] / total) * one.TWO_PI);
    }

    return radians;
  };

  this.draw = function (data, labels, colours, title) {

    // Test that data is not empty and that each input array is the
    // same length.
    if (data.length == 0) {
      alert('Data has length zero!');
    } else if (![labels, colours].every((array) => {
      return array.length == data.length;
    })) {
      alert(`Data (length: ${data.length})
      Labels (length: ${labels.length})
      Colours (length: ${colours.length})
      Arrays must be the same length!`);
    }

    var angles = this.get_radians(data);
    var lastAngle = 0;
    var colour;

    for (var i = 0; i < data.length; i++) {
      if (colours) {
        colour = colours[i];
      } else {
        colour = map(i, 0, data.length, 0, 255);
      }

      one.fill(colour);
      one.stroke(0);
      one.strokeWeight(1);

      one.arc(this.x, this.y,
        this.diameter, this.diameter,
        lastAngle, lastAngle + angles[i] + 0.001); // Hack for 0!

      if (labels) {
        this.makeLegendItem(labels[i], i, colour);
      }

      lastAngle += angles[i];
    }

    if (title) {
      one.noStroke();
      one.textAlign('center', 'center');
      one.textSize(18);
      one.text(title, this.x + 50, this.y - this.diameter * 0.6);
    }
  };

  this.makeLegendItem = function (label, i, colour) {
    var x = this.x + 50 + this.diameter / 2;
    var y = this.y + (this.labelSpace * i) - this.diameter / 3;
    var boxWidth = this.labelSpace / 2;
    var boxHeight = this.labelSpace / 2;

    one.fill(colour);
    one.rect(x, y, boxWidth, boxHeight);

    one.fill('black');
    one.noStroke();
    one.textAlign('left', 'center');
    one.textSize(12);
    one.text(label, x + boxWidth + 10, y + boxWidth / 2);
  };
}
