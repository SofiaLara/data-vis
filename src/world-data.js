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
  var question;

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
    this.dropdown.parent('nine');
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

    var sel = this.dropdown.selected();

    for (var x in this.cities) {
      if (this.cities[x].size == sel) {
        this.cities[x].drawPopulation(sel);
      }
    }
    
  };
}
