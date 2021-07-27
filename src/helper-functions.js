// --------------------------------------------------------------------
// Data processing helper functions.
// --------------------------------------------------------------------
function sum(data) {
  var total = 0;

  // Ensure that data contains numbers and not strings.
  data = stringsToNumbers(data);

  for (let i = 0; i < data.length; i++) {
    total = total + data[i];
  }

  return total;
}

function mean(data) {
  var total = sum(data);

  return total / data.length;
}

function sliceRowNumbers(row, start = 0, end) {
  var rowData = [];

  if (!end) {
    // Parse all values until the end of the row.
    end = row.arr.length;
  }

  for (i = start; i < end; i++) {
    rowData.push(row.getNum(i));
  }

  return rowData;
}

function stringsToNumbers(array) {
  return array.map(Number);
}

// --------------------------------------------------------------------
// Plotting helper functions
// --------------------------------------------------------------------

function drawAxis(layout, ins, colour = 0) {
  ins.stroke(ins.color(colour));

  // x-axis
  ins.line(layout.leftMargin,
    layout.bottomMargin,
    layout.rightMargin,
    layout.bottomMargin);

  // y-axis
  ins.line(layout.leftMargin,
    layout.topMargin,
    layout.leftMargin,
    layout.bottomMargin);
}

function drawAxisLabels(xLabel, yLabel, layout, ins) {
  ins.fill(0);
  ins.noStroke();
  ins.textAlign('center', 'center');

  // Draw x-axis label.
  ins.text(xLabel,
    (layout.plotWidth() / 2) + layout.leftMargin,
    layout.bottomMargin + (layout.marginSize * 1.5));

  // Draw y-axis label.
  ins.push();
  ins.translate(layout.leftMargin - (layout.marginSize * 1.5),
    layout.bottomMargin / 2);
  ins.rotate(- ins.PI / 2);
  ins.text(yLabel, 0, 0);
  ins.pop();
}

function drawYAxisTickLabels(min, max, layout, mapFunction,
  decimalPlaces, ins) {
  // Map function must be passed with .bind(this).
  var range = max - min;
  var yTickStep = range / layout.numYTickLabels;

  ins.fill(0);
  ins.noStroke();
  ins.textAlign('right', 'center');

  // Draw all axis tick labels and grid lines.
  for (i = 0; i <= layout.numYTickLabels; i++) {
    var value = min + (i * yTickStep);
    var y = mapFunction(value);

    // Add tick label.
    ins.text(value.toFixed(decimalPlaces),
      layout.leftMargin - layout.pad,
      y);

    if (layout.grid) {
      // Add grid line.
      ins.stroke(200);
      ins.line(layout.leftMargin, y, layout.rightMargin, y);
    }
  }
}

function drawXAxisTickLabel(value, layout, mapFunction, ins) {
  // Map function must be passed with .bind(this).
  var x = mapFunction(value);

  ins.fill(0);
  ins.noStroke();
  ins.textAlign('center', 'center');

  // Add tick label.
  ins.text(value,
    ins.x,
    layout.bottomMargin + layout.marginSize / 2);

  if (layout.grid) {
    // Add grid line.
    ins.stroke(220);
    ins.line(ins.x,
      layout.topMargin,
      ins.x,
      layout.bottomMargin);
  }
}
