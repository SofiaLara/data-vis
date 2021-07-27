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

  if (this.from_airport == 'Gatwick') {
    this.departureX = 170;
  } else if (this.from_airport == 'Stansted') {
    this.departureX = 270;
  } else if (this.from_airport == 'Heathrow') {
    this.departureX = 370;
  } else if (this.from_airport == 'Luton') {
    this.departureX = 470;
  } else if (this.from_airport == 'City') {
    this.departureX = 570;
  }

  this.departureY = 25;
    //ins.map(this.from_long, -180, 180, -2000, ins.width + 2000);
    //this.departureY = ins.map(this.from_lat, -90, 90, ins.height, 0)
    this.arrivalX = ins.map(this.to_long, -180,180,0, ins.width)
    this.arrivalY = ins.map(this.to_lat, -90,90, ins.height + 130, 0)

    this.selected = function() {
      if ( ins.dist(ins.mouseX, ins.mouseY, this.departureX, this.departureY) < 10 ) {
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

      if (this.selected()) {
        ins.fill(0, 0, 0)
        //ins.ellipse(this.departureX, this.departureY, 15, 15)
        ins.ellipse(this.arrivalX, this.arrivalY, 5, 5)
        //ins.text(this.to_city, this.arrivalX, this.arrivalY);
        ins.text(this.from_airport, this.departureX, this.departureY);
        ins.stroke(255);
        ins.line(this.departureX, this.departureY, this.arrivalX, this.arrivalY)
        ins.noStroke();
  
      } else {
        ins.fill(0, 0, 255)
        ins.noStroke();
        ins.ellipse(this.departureX, this.departureY, 15, 15)
        ins.text(this.from_airport, this.departureX, this.departureY);
      }
  }

}