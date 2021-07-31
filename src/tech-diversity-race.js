function TechDiversityRace(one) {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Tech Diversity: Race';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'tech-diversity-race';

  // Property to represent whether data has been loaded.
  this.loaded = false;
  this.radius = 80, one.width / 2, one.height / 2;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function () {
    var self = this;
    this.data = one.loadTable(
      './data/tech-diversity/race-2018.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
        self.setup();
      });
  };

  this.setup = function () {
    if (!this.loaded) {
      console.log('Data setup not yet loaded');
      return;
    }

    // Create a select DOM element.
    this.select = one.createSelect();
    //this.select.position(0, 0);
    this.select.parent('2');

    // Fill the options with all company names.
    var companies = this.data.columns;
    // First entry is empty.
    for (let i = 1; i < companies.length; i++) {
      this.select.option(companies[i]);
    }
  };

  this.destroy = function () {
    this.select.remove();
  };  

  // Create a new donut chart object.
  this.donut = new Donut(one.width / 2, one.height / 2, this.radius, one);

  this.draw = function () {
    if (!this.loaded) {
      console.log('Data draw not yet loaded');
      return;
    }

    // Get the value of the company we're interested in from the
    // select item.
    var companyName = this.select.value();

    // Get the column of raw data for companyName.
    var col = this.data.getColumn(companyName);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each category.
    //Colours on rgba to add decrease/opacity PLUS only way to compare with get()? 
    //Explore a way to create colours dynamically
    var colours = [[0,0,255,255], [255,0,0,255], [0,255,0,255], [0,255,255,255], [255,0,255,255], [255,255,0,255]];

    // Make a title.
    var title = 'Employee diversity at ' + companyName;

    // Draw the donut chart!
    //Change this name to donut!
    this.donut.draw(col, labels, colours, title);
    //Check if mouse over the piece of the donut
    this.donut.checkMouse(labels, colours);

  };
}
