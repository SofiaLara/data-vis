function BritishFoodAttitudes(six) {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'British Food Attitudes';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'british-food-attitudes';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function () {
    var self = this;
    this.data = six.loadTable(
      './data/food/attitudes-transposed.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
        self.setup();
      });
  };

  this.setup = function () {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Create a select DOM element.
    this.select = six.createSelect();
    //this.select.position(500, 1200);
    this.select.parent('six');

    // Fill the options with all company names.
    var questions = this.data.columns;
    // First entry is empty.
    for (var i = 1; i < questions.length; i++) {
      this.select.option(questions[i]);
    }
  };

  this.destroy = function () {
    this.select.remove();
  };

  // Create a new pie chart object.
  this.pie = new PieChart(six.width / 2, six.height / 2, six.width * 0.4, six);

  this.draw = function () {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the company we're interested in from the
    // select item.
    var question = this.select.value();

    // Get the column of raw data for question.
    var col = this.data.getColumn(question);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each category.
    var colours = [
      six.color(0, 204, 0),
      six.color(51, 255, 51),
      six.color(255, 255, 51),
      six.color(255, 153, 51),
      six.color(255, 51, 51)
    ];

    // Make a title.
    var title = question;

    // Draw the pie chart!
    this.pie.draw(col, labels, colours, title);
  };
}
