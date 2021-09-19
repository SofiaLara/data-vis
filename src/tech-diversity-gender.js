function TechDiversityGender(three) {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Tech Diversity: Gender';

  // Layout object to store all common plot layout parameters and
  // methods.
  this.layout = {
    // Locations of margin positions. Left and bottom have double margin
    // size due to axis and tick labels.
    leftMargin: 50,
    rightMargin: three.width - 20,
    topMargin: 50,
    bottomMargin: three.height - 50,
    pad: 5,

    plotWidth: function () {
      return this.rightMargin - this.leftMargin;
    },

    // Boolean to enable/disable background grid.
    grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    numXTickLabels: 10,
    numYTickLabels: 8,
  };

  // Middle of the plot: for 50% line.
  this.midX = (this.layout.plotWidth() / 2) + this.layout.leftMargin;

  // Default visualisation colours.
  this.femaleColour = three.color(255, 0, 0);
  this.maleColour = three.color(0, 255, 0);

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function () {
    var self = this;
    this.data = three.loadTable(
      './data/tech-diversity/gender-2018.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function () {
        self.loaded = true;
        self.setup();
      });
  };

  this.setup = function () {
    if (!this.loaded) {
      console.log('Data setup not yet loaded');
      return;
    }
    // Font defaults.
    three.textSize(10);
  };

  this.destroy = function () {
  };

  this.draw = function () {
    if (!this.loaded) {
      return;
    }

    //textSize(10);
    // Draw Female/Male labels at the top of the plot.
    this.drawCategoryLabels();

    var lineHeight = (three.height - this.layout.topMargin) /
      this.data.getRowCount();

    for (var i = 0; i < this.data.getRowCount(); i++) {

      // Calculate the y position for each company.
      var lineY = (lineHeight * i) + this.layout.topMargin;

      // Create an object that stores data from the current row.
      var company = {
        // Convert strings to numbers.
        'name': this.data.getString(i, 'company'),
        'female': this.data.getNum(i, 'female'),
        'male': this.data.getNum(i, 'male'),
      };

      // Draw the company name in the left margin.
      three.fill(0);
      three.noStroke();
      three.textAlign('right', 'top');
      three.text(company.name,
        this.layout.leftMargin - this.layout.pad,
        lineY);

      // Draw female employees rectangle.
      three.fill(this.femaleColour);
      three.rect(this.layout.leftMargin,
        lineY,
        this.mapPercentToWidth(company.female),
        lineHeight - this.layout.pad);

      // Draw male employees rectangle.
      three.fill(this.maleColour);
      three.rect(this.layout.leftMargin + this.mapPercentToWidth(company.female),
        lineY,
        this.mapPercentToWidth(company.male),
        lineHeight - this.layout.pad);
    }

    // Draw 50% line
    three.stroke(150);
    three.strokeWeight(1);
    three.line(this.midX,
      this.layout.topMargin,
      this.midX,
      this.layout.bottomMargin);

  };

  this.drawCategoryLabels = function () {
    three.fill(0);
    three.noStroke();
    three.textAlign('left', 'top');
    three.text('Female',
      this.layout.leftMargin,
      this.layout.pad);
    three.textAlign('center', 'top');
    three.text('50%',
      this.midX,
      this.layout.pad);
    three.textAlign('right', 'top');
    three.text('Male',
      this.layout.rightMargin,
      this.layout.pad);
  };

  this.mapPercentToWidth = function (percent) {
    return three.map(percent,
      0,
      100,
      0,
      this.layout.plotWidth());
  };
}
