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

  this.departureX = ins.width / 2;
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

    //Draw world map with cities coordinates
  //Thanks to https://vda-lab.github.io/2015/10/hands-on-data-visualization-using-p5
  // this.drawBackgroundWorld = function () {
  //   ins.fill(0, 255, 0);
  //   ins.ellipse(this.myLong, this.myLat, 5, 5);
  // }
  
  //Move it over to another constructor
    // this.drawBackgroundAirport = function (pg) {
    //   pg.ellipse(this.departureX -125, this.departureY - 30, 10, 10);
    //   pg.ellipse(this.arrivalX- 125, this.arrivalY - 150, 10, 10);
    // }
  //this.countries = [];
    
  // this.drawSelectedAirport = function () {
  //   if (ins.dist(ins.mouseX, ins.mouseY, this.departureX, this.departureY) < 10) {
  //     ins.fill(255, 0, 0)
  //     //ins.ellipse(this.departureX, this.departureY, 15, 15)
  //     ins.ellipse(this.arrivalX, this.arrivalY, 5, 5)
  //     //ins.text(this.to_city, this.arrivalX, this.arrivalY);
  //     ins.text(this.from_airport, this.departureX, this.departureY);
  //     ins.stroke(255);
  //     ins.line(this.departureX, this.departureY, this.arrivalX, this.arrivalY)
  //     ins.noStroke();
  //   }
  // }

  // this.drawDestinationCity = function () {
  //       ins.fill(0, 0, 255);
  //       ins.ellipse(this.arrivalX, this.arrivalY, 5, 5);
  //       ins.noStroke();
  //      // ins.ellipse(this.departureX, this.departureY, 15, 15)
  //       //ins.text(this.from_airport, this.departureX, this.departureY);
  // }

  //We pass the scale factor because we need to update our dots according to the zoom.
  //We pass the map new x and y position (also height and width? 80, 120)so the dots and lines update when we drag the map.
  this.drawDestinationBtn = function (city, sf, tx,ty, mapX, mapY) {
    ins.fill(0, 0, 255);
    ins.ellipse(this.arrivalX + mapX + 80, this.arrivalY + mapY - 120, 5, 5);
    ins.noStroke();
    
    if (city === this.from_airport) {
      ins.fill(0, 255, 0)
      ins.stroke(255);
      ins.line(this.departureX, this.departureY, this.arrivalX + mapX + 80, this.arrivalY + mapY - 120)
      ins.noStroke();
      ins.ellipse(this.departureX, this.departureY, 15, 15)
      ins.ellipse(this.arrivalX + mapX + 80, this.arrivalY + mapY - 120, 5, 5)
      ins.text(this.from_airport, this.departureX + 15, this.departureY + 5);
      if (ins.dist(ins.mouseX, ins.mouseY, (this.arrivalX + mapX + 80) * sf + tx, (this.arrivalY + mapY - 120) * sf + ty) < 5) {
        ins.fill(0, 0, 0)
        ins.text(this.to_city, this.arrivalX + mapX + 80, this.arrivalY + mapY - 120);
      }
    }
  }
}