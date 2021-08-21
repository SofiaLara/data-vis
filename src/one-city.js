function OneCity(lng, lat, ins, x, size, country) {

  this.lang = lng;
  this.lat = lat;
  this.city = lng;
  this.pop = lat;
  this.size = size;
  this.country = country;

  //Latitude and longitude for each city.
  this.myLong = ins.map(this.lang, -180, 180, -20, ins.width+20);
  this.myLat = ins.map(this.lat, -90, 90, 450, 100);

  //Population of each city
  this.myPop = ins.map(this.pop, 37977000, -10000000, 100, 5);
  //Bigger the population darker the color
  this.color = ins.map(this.myPop, 100, 5, 0, 255);
  //Bigger the population, taller the rect()
  this.placeY = ins.map(this.myPop, 100, 5, 50, ins.height - 5);
  //Big population, big font
  this.fontSize = ins.map(this.myPop, 100, 5, 42, 10);
  //Cities ranking
  this.position = Number(x) + 1;
  
  //x position for large and small cities
  this.posX = function (sel) {
    var pos;
    
    if (sel == 'small') {
      pos = (x * 5) - 500;
    } else {
      pos = x * 5;
    }
        
    return pos;
  }

  //Function to select large or small city on hover
  this.selected = function (sel) {
    if ((ins.mouseX > this.posX(sel)) && (ins.mouseX < (this.posX(sel)+5)) &&
      (ins.mouseY > this.placeY) && (ins.mouseY < (this.placeY)+(550 - this.myPop)))
    {
        return true
    } else {
        return false
    }
  }
    
  //Draw world map with cities coordinates
  //Thanks to https://vda-lab.github.io/2015/10/hands-on-data-visualization-using-p5
  this.drawBackgroundWorld = function () {
    ins.fill(0, 255, 0);
    ins.ellipse(this.myLong, this.myLat, 5, 5);
  }

  //Show cities and population
  this.drawPopulation = function (sel) {
      if (this.selected(sel)) {
        ins.fill(0, 255, 255);
        ins.rect(this.posX(sel), this.placeY, 5, 550 - this.myPop);
        ins.fill(this.color, 100, this.color, 100);
        ins.ellipse(ins.width/4, ins.height/3 - 5, this.myPop, this.myPop);
        ins.fill(0, 0, 0);
        ins.textSize(this.fontSize);
        ins.text(`N˚${this.position}`, ins.width/4, ins.height/3 - 30);
        ins.text(`${this.city}, ${this.country}`, ins.width/4, ins.height/3);
        ins.text(this.pop, ins.width/4, ins.height/3 + 30);
      } else {
        ins.fill(this.color, this.color, 0);
        ins.rect(this.posX(sel), this.placeY, 5, 550 - this.myPop);
      }
  }

}