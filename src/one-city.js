function OneCity(lng, lat, ins, x, size, country) {
  //Public
  this.lang = lng;
  this.lat = lat;
  this.city = lng;
  this.pop = lat;
  this.size = size;
  this.country = country;

  //Private 
  var y = ins.height;

  //Population of each city
  this.my_pop = ins.map(this.pop, 37977000, -10000000, 100, 5);
  //Bigger the population, darker the color
  this.color = ins.map(this.my_pop, 100, 5, -100, 255);
  //Bigger the population, taller the bar
  this.place_y = ins.map(this.my_pop, 5, 100, ins.height, 50);
  //Bigger population, bigger font
  this.font_size = ins.map(this.my_pop, 100, 5, 42, 10);
  //Cities ranking
  this.position = Number(x) + 1;
  
  //x position for large and small cities
  this.posX = function (sel) {
    var pos;
    
    if (sel == 'Smallest') {
      pos = (x * 5) - 500;
    } else {
      pos = x * 5;
    }
        
    return pos;
  }

  //y position animation
  this.posY = function () {
    y = y - 5;

    if (y <= this.place_y) {
      y = this.place_y
    }

    return y;
  }


  //Function to show bar data on hover
  this.selected = function (sel) {
    if ((ins.mouseX > this.posX(sel)) && (ins.mouseX < (this.posX(sel)+5)) &&
      (ins.mouseY > this.place_y) && (ins.mouseY < (this.place_y)+(550 - this.my_pop))) {
        return true
    } else {
        return false
    }
  }

  //Draw cities and population
  this.drawPopulation = function (sel) {
    if (this.selected(sel)) {
      ins.fill(0, 255, 255);
      ins.rect(this.posX(sel), this.posY(), 5, 550 - this.my_pop);
      ins.fill(this.color, 100, this.color, 100);
      ins.ellipse(ins.width/4, ins.height/3 - 5, this.my_pop, this.my_pop);
      ins.fill(0, 0, 0);
      ins.textSize(this.font_size);
      ins.text(`N˚${this.position}`, ins.width/4, ins.height/3 - 30);
      ins.text(`${this.city}, ${this.country}`, ins.width/4, ins.height/3);
      ins.text(this.pop, ins.width/4, ins.height/3 + 30);
    } else {
      ins.fill(this.color, this.color, 0);
      ins.rect(this.posX(sel),this.posY(), 5, 550 - this.my_pop);
    }
  }

  //Resets y position of the bars not being drawn so we can animate them again when selected
  this.animateBars = function () {
      y = ins.height;
  }
}