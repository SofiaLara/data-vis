function WorldData(nine) {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Biggest 100 cities';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'flights';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  //Save all cities objects
  this.cities = [];

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  // Data from https://simplemaps.com/data/world-cities.
  this.preload = function () {
    var self = this;
    this.dataCity = nine.loadTable(
      './data/flights/worldpopulation.csv', 'csv', 'header',
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
    
    // Count the number of frames drawn since the visualisation
    // started so that we can animate the plot.
    this.frameCount = 0;
  
    var cityRows = this.dataCity.getRows();
    for (var j in cityRows) {
      var cities = cityRows[j].getString("city");
      var country = cityRows[j].getString("country");
      var pop = cityRows[j].getNum("population");
      var size = cityRows[j].getString("size");

      var one_city = new OneCity(cities, pop, nine, j, size, country);
      this.cities.push(one_city);
    }

    // Create a select DOM element.
    this.dropdown = nine.createSelect();
    //this.dropdown.position(600, 1700);
    this.dropdown.parent('1');
    this.dropdown.option("large");
    this.dropdown.option("small");
  };

  this.destroy = function () {
  };

  this.draw = function () {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Count the number of cities plotted each frame to create
    // animation effect.
    var citiesCount = 0;

    var sel = this.dropdown.selected();

    for (var x in this.cities) {
      if (this.cities[x].size === sel) {
        this.cities[x].drawPopulation(sel);
        citiesCount++;
      }

      // Stop drawing this frame when the number of years drawn is
      // equal to the frame count. This creates the animated effect
      // over successive frames.
      if (citiesCount >= this.frameCount) {
        break;
      }
    }

    // Count the number of frames since this visualisation
    // started. This is used in creating the animation effect and to
    // stop the main p5 draw loop when all years have been drawn.
    this.frameCount++;
    
  };
}
