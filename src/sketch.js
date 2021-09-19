var screens = 10;

for(let k = 0; k < screens ;k++){
var sketches = function( ins ) { 
  var gallery;

  ins.setup = function () {
    //Creates different instances of p5js to have each visualization in different canvas.
    canvasContainer = ins.select(`${k}`);
    var c = ins.createCanvas(500, 500);
    c.parent(`${k}`);
      
    gallery = new Gallery();
    
    //Array with all my vis
    let vis = [
      new EatingHabits(ins),
      new WorldData(ins),
      new TechDiversityRace(ins),
      new Flights(ins),
      new BritishFoodAttitudes(ins),
      new ClimateChange(ins),
      new Nutrients(ins),
      new PayGapByJob2017(ins),
      new PayGapTimeSeries(ins),
      new TechDiversityGender(ins),
    ];

    gallery.addVisual(vis[k]);
    };
  
  ins.draw = function () {
    //Animates the background gradient color
    var m = 100;
    var top_r = 255 * ins.noise(ins.frameCount / m);
    var top_rg = 255 * ins.noise(1000 + ins.frameCount / m);
    var top_rgb = 255 * ins.noise(2000 + ins.frameCount / m);
    var bottom_r = 255 * ins.noise(3000 + ins.frameCount / m);
    var bottom_rg = 255 * ins.noise(4000  + ins.frameCount / m);
    var bottom_rgb = 255 * ins.noise(5000 + ins.frameCount / m);

    var top_color = ins.color(top_r, top_rg, top_rgb);
    var bottom_color = ins.color(bottom_r, bottom_rg, bottom_rgb);
    
    //Generates the gradient
    for(let y = 0; y < ins.height; y++) {
      var line_color = ins.lerpColor(top_color, bottom_color, y / ins.height);

      ins.stroke(line_color);
      ins.line(0, y, ins.width, y);
    }

    //Gallery draws the vis
    gallery.visuals[0].draw();
  };
};

  var myp5 = new p5(sketches);
}