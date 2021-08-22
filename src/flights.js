function Flights(eight) {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Flights from uk';

  // Each visualisation must have a unique ID with no special characters.
  this.id = 'flights';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  //Save all flights objects
  this.flights = [];
  //this.countries = [];

  //Store departures Cities
  var citySelected;

  //Draw a world map with cities
  // var cityRows;
  // this.myLat = [];
  // this.myLong = [];

  //Zoom2
  let scaleFactor = 1, tx = 0, ty = 0;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function () {
    var self = this;
    this.map = eight.loadImage('img/world.svg');
    // this.dataCity = eight.loadTable(
    //   './data/flights/worldcities.csv', 'csv', 'header',
    //   // Callback function to set the value
    //   // this.loaded to true.
    //   function (table) {
    //     self.loaded = true;
    //     self.setup();
    //   });
    this.data = eight.loadTable(
      './data/flights/flights.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
        self.setup();
      });
  };

  this.setup = function () {
    var rows = this.data.getRows();
    for ( var i in rows ) {
      var from_airport = rows[i].getString("from_airport")
      var from_city = rows[i].getString("from_city")
      var from_country = rows[i].getString("from_country")
      var from_long = rows[i].getNum("from_long")
      var from_lat = rows[i].getNum("from_lat")
      //var to_airport = rows[i].getString("to_airport")
      var to_city = rows[i].getString("to_city")
      var to_country = rows[i].getString("to_country")
      var to_long = rows[i].getNum("to_long")
      var to_lat = rows[i].getNum("to_lat")
      //var airline = rows[i].getString("airline")
      //var airline_country = rows[i].getString("airline_country")
      var distance = rows[i].getNum("distance")

      var one_flight = new OneFlight(distance, from_long, from_lat, to_long, to_lat, from_country, from_city, to_country, to_city, from_airport, eight)
      //var one_city = new OneCity(to_long, to_lat, eight);

      if (from_city == 'London') {
        this.flights.push(one_flight);
        //console.log('yay', one_flight);
      // } else if (from_city == undefined) {
      //   console.log('nay', one_flight);
      //   this.flights.push(one_flight);
      }
      // else if (!this.countries.includes(one_city)) {
      //   //console.log('nay', one_city);
      //   this.countries.push(one_city);
      // }

      // if (!this.countries.includes(to_country)) {
      //   this.countries.push(to_country);
      // }
      
    }

    // var cityRows = this.dataCity.getRows();
    // for (var j in cityRows) {
    //   var lng = cityRows[j].getNum("lng");
    //   var lat = cityRows[j].getNum("lat");

    //   var one_country = new OneCity(lng, lat, eight);
    //   this.countries.push(one_country);
    // }

    // eight.mouseOver = function (zoomIn) {
    //         //this.mouseOver();
    // };

    // Create a select DOM element.
    var selected = ["City", "Luton", "Gatwick", "Heathrow", "Stansted"];
  
    this.dropdowns = eight.createSelect();
    this.dropdowns.parent('9');
    for (var i =0; i< selected.length; i++) {
      this.dropdowns.option(selected[i]);
    }

    this.plusBtn = eight.createButton('+');
    this.plusBtn.parent('9');
    this.plusBtn.mousePressed(btnPlus);

    this.lessBtn = eight.createButton('-');
    this.lessBtn.parent('9');
    this.lessBtn.mousePressed(btnLess);
  };

  this.destroy = function () {
  };

  this.draw = function () {
    //Zoom2
    eight.translate(tx, ty);
    eight.scale(scaleFactor);

    //SVG map instead?
    if (this.loaded) {
      eight.image(this.map, -80, 120, eight.width + 120, 257);
      citySelected = this.dropdowns.value();
    }
  

    // for (var x in this.countries) {
    //   this.countries[x].drawBackgroundWorld();
    // }

    
    // for (var i in this.flights) {
    //   this.flights[i].drawDestinationCity();
    // }

    // for (var i in this.flights) {
    //   this.flights[i].drawSelectedAirport()
    // }


    for (var i in this.flights) {
      this.flights[i].drawDestinationBtn(citySelected, scaleFactor,tx,ty);
    }

    
  //  if (this.plusBtn.mousePressed()) {
  //   console.log('here?', name);
  //   console.log('here?', this.flights);
  //   for (var i in this.flights) {
  //     if (this.flights[i].from_airport === name) {
  //       console.log('luton');
  //       this.flights[i].drawSelectedAirport();
  //     }
  //   }
  //  }
    
    
    // if (eight.mouseIsPressed) {
    //   console.log('here');
    //   this.mouseWheel(e);
    // }



    
  };

  function applyScale(s) {
    scaleFactor = scaleFactor * s;
    tx = (eight.height/2) * (1-s) + tx * s;
    ty = (eight.width/2) * (1-s) + ty * s;
  }

  function btnPlus() {
    applyScale(1.05);
  }

  function btnLess() {
    applyScale(0.95);
  }
 
}
