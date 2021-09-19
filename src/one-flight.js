function OneFlight(tlo, tla, tcy, fa, ins) {

  this.to_long = tlo
  this.to_lat = tla
  this.to_city = tcy
  this.from_airport = fa

  this.departure_x = ins.width / 2;
  this.departure_y = 25;
  this.arrival_x = ins.map(this.to_long, -180,180, -70, ins.width + 25)
  this.arrival_y = ins.map(this.to_lat, -90, 90, ins.height - 60, 100)

  this.selected = function() {
    if ( ins.dist(ins.mouseX, ins.mouseY, this.arrival_x, this.arrival_y) < 5 ) {
        return true
    } else {
        return false
    }
  }

  //Thanks to https://vda-lab.github.io/2015/10/hands-on-data-visualization-using-p5

  //Pass the map new x and y position so the dots and lines update when dragging the map.
  this.drawDestinationCity = function (mapX, mapY) {
    //Draw non-selected cities
    ins.fill(0, 0, 255, 50);
    ins.ellipse(this.arrival_x + mapX + 80, this.arrival_y + mapY - 120, 3, 3);
    ins.noStroke();
  }

  //Pass the scale factor to update our dots according to the zoom.
  this.drawSelectedCity = function (city, sf, tx, ty, mapX, mapY) {
     //Draw selected cities
    if (city === this.from_airport) {
      ins.fill(0, 255, 0)
      ins.stroke(255, 50);
      ins.line(this.departure_x, this.departure_y, this.arrival_x + mapX + 80, this.arrival_y + mapY - 120)
      ins.noStroke();
      ins.ellipse(this.departure_x, this.departure_y, 15, 15)
      ins.ellipse(this.arrival_x + mapX + 80, this.arrival_y + mapY - 120, 3, 3)
      ins.text(this.from_airport, this.departure_x + 15, this.departure_y + 5);

      if (ins.dist(ins.mouseX, ins.mouseY, (this.arrival_x + mapX + 80) * sf + tx, (this.arrival_y + mapY - 120) * sf + ty) < 5) {
        ins.fill(0, 0, 0)
        ins.text(this.to_city, this.arrival_x + mapX + 80, this.arrival_y + mapY - 120);
      }
    }
  }
}