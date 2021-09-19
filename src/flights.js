function Flights(eight) {

  // Name of the visualisation
  this.name = 'Flights from uk';

  // Each visualisation must have a unique ID with no special characters.
  this.id = 'flights';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  //Save all flights objects
  this.flights = [];

  //Store departures Cities
  var city_selected;

  //Zoom
  var scale_factor = 1;
  var tx = 0;
  var ty = 0;

  //Drag
  var map_x = -80;
  var map_y = 120;
  var map_w = eight.width + 120;
  var map_h = 257;
  var dragging = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function () {
    var self = this;
    this.map = eight.loadImage('img/world.svg');
    this.data = eight.loadTable(
      './data/flights/flights.csv', 'csv', 'header',
      // Callback function to set the value this.loaded to true.
      function () {
        self.loaded = true;
        self.setup();
      });
  };

  this.setup = function () {
    var rows = this.data.getRows();
    for ( var i in rows ) {
      var from_airport = rows[i].getString("from_airport")
      var from_city = rows[i].getString("from_city")
      var to_city = rows[i].getString("to_city")
      var to_long = rows[i].getNum("to_long")
      var to_lat = rows[i].getNum("to_lat")

      var one_flight = new OneFlight(to_long, to_lat, to_city, from_airport, eight)

      //Save only flights from London airports
      if (from_city == 'London') {
        this.flights.push(one_flight);
      }

      //Event listeners for dragging the canvas
      eight.mousePressed = function () {
        pressedCanvas();
      }

      eight.mouseDragged = function () {
        draggedCanvas();
      }

      eight.mouseReleased = function () {
        releasedCanvas();
      }
      
    }

    // Create a select DOM element.
    let m = eight.createP('Select one UK airport to view city destinations').addClass('flights-title');
    m.parent('3');
    m.style('font-size', '16px');
    m.position(20, 0);

    var selected = ["City", "Luton", "Gatwick", "Heathrow", "Stansted"];
  
    this.dropdowns = eight.createSelect();
    this.dropdowns.parent('3');
    for (var i =0; i< selected.length; i++) {
      this.dropdowns.option(selected[i]);
    }

    //Create buttons to zoom out and in
    let p = eight.createP('Click to zoom the map');
    p.parent('3');
    p.style('font-size', '16px');
    p.position(20, 0);

    this.plus_btn = eight.createButton('+');
    this.plus_btn.parent('3');
    this.plus_btn.mousePressed(btnPlus);

    this.less_btn = eight.createButton('-');
    this.less_btn.parent('3');
    this.less_btn.mousePressed(btnLess);

  };

  this.draw = function () {
    //Zoom the canvas
    eight.translate(tx, ty);
    eight.scale(scale_factor);

    //SVG map
    if (this.loaded) {
      eight.image(this.map, map_x, map_y, map_w, map_h);
      city_selected = this.dropdowns.value();
    }

    //Draw cities on the map
    for (var i in this.flights) {
      this.flights[i].drawDestinationCity(map_x, map_y);
      this.flights[i].drawSelectedCity(city_selected, scale_factor,tx,ty, map_x, map_y);
    }
  };

  //Zoom functionality
  var applyScale = function(s) {
    scale_factor = scale_factor * s;
    tx = (eight.height/2) * (1-s) + tx * s;
    ty = (eight.width/2) * (1-s) + ty * s;
  }

  var btnPlus = function() {
    applyScale(1.05);
  }

  var btnLess = function() {
    applyScale(0.95);
  }

  //Drag functionality
  var pressedCanvas = function() {
    if (eight.mouseX > map_x
      && eight.mouseX < map_x + map_w
      && eight.mouseY > map_y
      && eight.mouseY < map_y + map_h) {
      dragging = true;
    }
  }

  var draggedCanvas = function() {
    if (dragging) {
      map_x = eight.mouseX - map_w / 2;
      map_y = eight.mouseY - map_h / 2;
    }
  }

  var releasedCanvas = function() {
     dragging = false;
  }
}
