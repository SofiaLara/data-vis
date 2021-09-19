function TechDiversityRace(one) {

  // Name of the visualisation.
  this.name = 'Tech Diversity: \n Race employee diversity at';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  //Radius of the donut chart
  this.radius = 80, one.width / 2, one.height / 2;

  //Count for animation
  var count = 0;

  // Preload the data.
  this.preload = function () {
    var self = this;
    this.data = one.loadTable(
      './data/tech-diversity/race-2018.csv', 'csv', 'header',
      // Callback function to set the value this.loaded to true and start the setup
      function () {
        self.loaded = true;
        self.setup();
      });
  };

  this.setup = function () {
    // Create a select DOM element.
    this.select = one.createSelect();
    this.select.parent('2');

    // Fill the options with all company names.
    var companies = this.data.columns;
    for (let i = 1; i < companies.length; i++) {
      this.select.option(companies[i]);
    }
    this.select.changed(this.listen);
  };

  this.listen = function () {
    //Reset count when another company is selected
    count = 0;
  }

  this.draw = function () {
    if (!this.loaded) {
      return;
    }

    //Count for animation
    count++;

    // Get the value of the company we're interested in from the select item.
    var companyName = this.select.value();

    // Get the column of raw data for companyName.
    var col = this.data.getColumn(companyName);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    //Pass the data to the donut object
    this.createDonut(col, count);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each category.
    var colours = [[0,0,255,255], [255,0,0,255], [0,255,0,255], [0,255,255,255], [255,0,255,255], [255,255,0,255]];

    // Show vis title
    this.showTitle(companyName);

    // Draw the donut chart!
    this.donut.draw(col, labels, colours);
  
    //Check if mouse over the piece of the donut
    this.donut.checkMouse(labels, colours);
  };

  // Create a new donut chart object.
  this.createDonut = function (data, count) {
    this.donut = new Donut(one.width / 2, one.height / 2, this.radius, data, count, one);
  }

  //Name of the vis changes with the selected option
  this.showTitle = function (companyName) {
    one.push()
    one.fill(0, 0, 0);
    one.noStroke();
    one.textSize(24);
    one.text(`${this.name} ${companyName}`, one.width/2, one.height/6);
    one.pop()
  }
}
