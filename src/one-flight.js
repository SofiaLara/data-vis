function OneFlight(d, flo, fla, tlo, tla, fc, fcy, tc, tcy, fa, ins) {

  this.distance = d
  this.from_long = flo
  this.from_lat = fla
  this.to_long = tlo
  this.to_lat = tla
  this.from_country = fc
  this.from_city = fcy
  this.to_country = tc
  this.to_city = tcy
  this.from_airport = fa
  
  var active = false;

  if (this.from_airport == 'Gatwick') {
    this.departureX = 170;
  } else if (this.from_airport == 'Stansted') {
    this.departureX = 270;
  } else if (this.from_airport == 'Heathrow') {
    this.departureX = 370;
  } else if (this.from_airport == 'Luton') {
    this.departureX = 470;
  } else if (this.from_airport == 'City') {
    this.departureX = 70;
  }

  this.departureY = 25;
  this.arrivalX = ins.map(this.to_long, -180,180, -70, ins.width + 25)
  this.arrivalY = ins.map(this.to_lat, -90, 90, ins.height - 60, 100)

  this.selected = function() {
    if ( ins.dist(ins.mouseX, ins.mouseY, this.arrivalX, this.arrivalY) < 5 ) {
        return true
    } else {
        return false
    }
  }
  
  //Move it over to another constructor
    // this.drawBackgroundAirport = function (pg) {
    //   pg.ellipse(this.departureX -125, this.departureY - 30, 10, 10);
    //   pg.ellipse(this.arrivalX- 125, this.arrivalY - 150, 10, 10);
    // }
  //this.countries = [];
    
  this.drawSelectedAirport = function () {
    if (ins.dist(ins.mouseX, ins.mouseY, this.departureX, this.departureY) < 10) {
      ins.fill(255, 0, 0)
      //ins.ellipse(this.departureX, this.departureY, 15, 15)
      ins.ellipse(this.arrivalX, this.arrivalY, 5, 5)
      //ins.text(this.to_city, this.arrivalX, this.arrivalY);
      ins.text(this.from_airport, this.departureX, this.departureY);
      ins.stroke(255);
      ins.line(this.departureX, this.departureY, this.arrivalX, this.arrivalY)
      ins.noStroke();
    }
  }

  this.drawDestinationCity = function () {
        ins.fill(0, 0, 255);
        ins.ellipse(this.arrivalX, this.arrivalY, 5, 5);
        ins.noStroke();
       // ins.ellipse(this.departureX, this.departureY, 15, 15)
        //ins.text(this.from_airport, this.departureX, this.departureY);
  }

  this.drawDestinationBtn = function (city, sf, tx,ty) {
    ins.fill(0, 0, 255);
    ins.ellipse(this.arrivalX, this.arrivalY, 5, 5);
    ins.noStroke();
    
    if (city === this.from_airport) {
      ins.fill(0, 255, 0)
      ins.stroke(255);
      ins.line(this.departureX, this.departureY, this.arrivalX, this.arrivalY)
      ins.noStroke();
      ins.ellipse(this.departureX, this.departureY, 15, 15)
      ins.ellipse(this.arrivalX, this.arrivalY, 5, 5)
      ins.ellipse(this.departureX, this.departureY, 15, 15)
      ins.text(this.from_airport, this.departureX, this.departureY);
      if (ins.dist(ins.mouseX, ins.mouseY, this.arrivalX  * sf + tx, this.arrivalY * sf + ty) < 5) {
        ins.fill(0, 0, 0)
        ins.text(this.to_city, this.arrivalX, this.arrivalY);
      }
    }
  }
}