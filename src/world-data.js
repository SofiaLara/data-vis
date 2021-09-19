function WorldData(nine) {

  // Name of the visualisation 
  this.name = '100 cities';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  //Save all cities objects
  this.cities = [];

  // Preload the data.
  // Data from https://simplemaps.com/data/world-cities.
  this.preload = function () {
    var self = this;
    this.dataCity = nine.loadTable(
      './data/flights/worldpopulation.csv', 'csv', 'header',
      // Callback function to set the value this.loaded to true and start the setup
      function () {
        self.loaded = true;
        self.setup();
      });
  };

  this.setup = function () {
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
    this.dropdown.parent('1');
    this.dropdown.option("Largest");
    this.dropdown.option("Smallest");
  };

  this.draw = function () {
    if (!this.loaded) {
      return;
    }

    //Get the value of the dropdown
    var sel = this.dropdown.selected();
    this.showTitle(sel);

    //Loop over the cities stored in the array to draw and animate them
    for (var x in this.cities) {
      if (this.cities[x].size === sel) {
        this.cities[x].drawPopulation(sel);
      } else {
        this.cities[x].animateBars();
      }
    }
    
  };

  //Name of the vis changes with the selected option
  this.showTitle = function (sel) {
    nine.push()
    nine.fill(0, 0, 0);
    nine.textSize(24);
    nine.text(`${sel} ${this.name}`, nine.width/4, nine.height/6);
    nine.pop()
  }
}
