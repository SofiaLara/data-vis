function Flights(eight) {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Flights from uk';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'flights';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  //Save all flights objects
  this.flights = [];
  this.countries = [];

  //Draw a world map with cities
  //var cityRows;
  // this.myLat = [];
  // this.myLong = [];

  //Image background
  //var map;

  //Zoom
  // let sf = 1; // scaleFactor
  // let x = 0; // pan X
  // let y = 0; // pan Y

  // var mx, my; // mouse coords;

  // var c = '';

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function () {
    //this.map = eight.loadImage('img/world2.png');
    var self = this;
    this.dataCity = eight.loadTable(
      './data/flights/worldcities.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
        self.setup();
      });
    this.data = eight.loadTable(
      './data/flights/uk-flights.csv', 'csv', 'header',
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
      
      if (from_city == 'London') {
        this.flights.push(one_flight);
      }

      // if (!this.countries.includes(to_country)) {
      //   this.countries.push(to_country);
      // }
      
    }

    var cityRows = this.dataCity.getRows();
    for (var j in cityRows) {
      var lng = cityRows[j].getNum("lng");
      var lat = cityRows[j].getNum("lat");

      var one_country = new OneCity(lng, lat, eight);
      this.countries.push(one_country);
    }

     //h.mouseWheel(zoomIn);
      //this.mouseOver();
    //}
  };

  this.destroy = function () {
  };

  this.draw = function () {
    //SVG map instead?
    // if (this.loaded) {
    //   //eight.image(this.map, 0,0, eight.width,eight.height);
    // }

    for (var x in this.countries) {
      this.countries[x].drawBackgroundWorld();
    }

    // mx = eight.mouseX;
    // my = eight.mouseY;

    // eight.translate(mx, my);
    // eight.scale(sf);
    // eight.translate(-mx, -my);
    // eight.translate();
    for (var i in this.flights) {
      this.flights[i].drawSelectedAirport();
    }


    // if (eight.mouseIsPressed) {
    //   console.log('here');
    //   x -= eight.pmouseX - eight.mouseX;
    //   y -= eight.pmouseY - eight.mouseY;
    // }
    
  };

  // function zoomIn(e) {
  //   console.log('here over');
  //       if (e.deltaY > 0)
  //         sf *= 1.05;
  //       else
  //         sf *= 0.95;
  // }
 
}
