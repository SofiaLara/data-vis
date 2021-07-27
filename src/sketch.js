
// //TODO - Make a loop of all the instances to avoid repetition of the functions.
// //To explore: hide viz behind an action like mouseOver to start and stop the viz- Could help with loading times?

// var sketchOne = function (one) {
//   var gallery;

//   one.setup = function () {
//     canvasContainer = one.select('#one');
//     var a = one.createCanvas(500, 500);
//     a.parent('one');

//     // Create a new gallery object.
//     gallery = new Gallery();

//     // Add the visualisation objects here.
//     gallery.addVisual(new TechDiversityRace(one));

//   }

//   one.draw = function () {
//     one.background(120, 120, 120);

//     for (i = 0; i < gallery.visuals.length; i++) {
//       //console.log('draw all', gallery.visuals[i]);
//       gallery.visuals[i].draw();
//     }
//   }
// }

// var sketchTwo = function (two) {
//   var gallery;

//   two.setup = function () {
//     canvasContainer = two.select('#two');
//     var b = two.createCanvas(500, 500);
//     b.parent('two');

//     // Create a new gallery object.
//     gallery = new Gallery();

//     // Add the visualisation objects here.
//     gallery.addVisual(new ClimateChange(two));
//   }

//   two.draw = function () {
//     two.background(255, 50, 100);

//     for (i = 0; i < gallery.visuals.length; i++) {
//       //console.log('draw all', gallery.visuals[i]);
//       gallery.visuals[i].draw();
//     }
//   }
// }

// var sketchThree = function (three) {
//   var gallery;

//   three.setup = function () {
//     canvasContainer = three.select('#three');
//     var c = three.createCanvas(500, 500);
//     c.parent('three');

//     // Create a new gallery object.
//     gallery = new Gallery();

//     // Add the visualisation objects here.
//     gallery.addVisual(new TechDiversityGender(three));
//   }

//   three.draw = function () {
//     three.background(155, 50, 50);

//     for (i = 0; i < gallery.visuals.length; i++) {
//       //console.log('draw all', gallery.visuals[i]);
//       gallery.visuals[i].draw();
//     }
//   }
// }

// var sketchFour = function (four) {
//   var gallery;

//   four.setup = function () {
//     canvasContainer = four.select('#four');
//     var d = four.createCanvas(500, 500);
//     d.parent('four');

//     // Create a new gallery object.
//     gallery = new Gallery();

//     // Add the visualisation objects here.
//     gallery.addVisual(new PayGapTimeSeries(four));
//   }

//   four.draw = function () {
//     four.background(150, 100, 50);

//     for (i = 0; i < gallery.visuals.length; i++) {
//       //console.log('draw all', gallery.visuals[i]);
//       gallery.visuals[i].draw();
//     }
//   }
// }

// var sketchFive = function (five) {
//   var gallery;

//   five.setup = function () {
//     canvasContainer = five.select('#five');
//     var e = five.createCanvas(500, 500);
//     e.parent('five');

//     // Create a new gallery object.
//     gallery = new Gallery();

//     // Add the visualisation objects here.
//     gallery.addVisual(new PayGapByJob2017(five));
//   }

//   five.draw = function () {
//     five.background(50, 100, 50);

//     for (i = 0; i < gallery.visuals.length; i++) {
//       //console.log('draw all', gallery.visuals[i]);
//       gallery.visuals[i].draw();
//     }
//   }
// }

// var sketchSix = function (six) {
//   var gallery;

//   six.setup = function () {
//     canvasContainer = six.select('#six');
//     var f = six.createCanvas(500, 500);
//     f.parent('six');

//     // Create a new gallery object.
//     gallery = new Gallery();

//     // Add the visualisation objects here.
//     gallery.addVisual(new BritishFoodAttitudes(six));
//   }

//   six.draw = function () {
//     six.background(50, 100, 150);

//     for (i = 0; i < gallery.visuals.length; i++) {
//       //console.log('draw all', gallery.visuals[i]);
//       gallery.visuals[i].draw();
//     }
//   }
// }

// //Won't use this extension - REMOVE
// // var sketchSeven = function (seven) {
// //   var gallery;

// //   seven.setup = function () {
// //     canvasContainer = seven.select('#seven');
// //     var g = seven.createCanvas(500, 500);
// //     g.parent('seven');

// //     // Create a new gallery object.
// //     gallery = new Gallery();

// //     // Add the visualisation objects here.
// //     gallery.addVisual(new Nutrients(seven));
// //   }

// //   seven.draw = function () {
// //     seven.background(50, 100, 250);

// //     for (i = 0; i < gallery.visuals.length; i++) {
// //       //console.log('draw all', gallery.visuals[i]);
// //       gallery.visuals[i].draw();
// //     }
// //   }
// // }

// var sketchEight = function (eight) {
//   var gallery;
//   //var started;

//   eight.setup = function () {
//     canvasContainer = eight.select('#eight');
//     var h = eight.createCanvas(1000,500);
//     h.parent('eight');
//     //h.mouseOver(initDraw);
//     //h.mouseOut(initDraw);

//     // Create a new gallery object.
//     gallery = new Gallery();

//     // Add the visualisation objects here.
//     gallery.addVisual(new Flights(eight, h));
//   }

//   eight.draw = function () {
//     eight.background(255, 0, 255);

//     //if (started) {
//       for (i = 0; i < gallery.visuals.length; i++) {
//       //console.log('draw all', gallery.visuals[i]);
//       gallery.visuals[i].draw();
//       }
//     //}
//   }

//   //   function initDraw() {
//   //   console.log('here!!');
//   //   started = !started;
//   // }
// }

// var sketchNine = function (nine) {
//   var gallery;
//   //var started;

//   nine.setup = function () {
//     canvasContainer = nine.select('#nine');
//     var j = nine.createCanvas(500,500);
//     j.parent('nine');
//     //j.mouseOver(initDraw);
//     //j.mouseOut(initDraw);

//     // Create a new gallery object.
//     gallery = new Gallery();

//     // Add the visualisation objects here.
//     gallery.addVisual(new WorldData(nine));
//   }

//   nine.draw = function () {
//     nine.background(255, 255, 0);

//     //if (started) {
//       for (i = 0; i < gallery.visuals.length; i++) {
//       //console.log('draw all', gallery.visuals[i]);
//       gallery.visuals[i].draw();
//       }
//     //}
    
//   }

//   // function initDraw() {
//   //   console.log('here!!');
//   //   started = !started;
//   // }
// }

// var sketchTen = function (ten) {
//   var gallery;

//   ten.setup = function () {
//     canvasContainer = ten.select('#ten');
//     var j = ten.createCanvas(500,500);
//     j.parent('ten');

//     // Create a new gallery object.
//     gallery = new Gallery();

//     // Add the visualisation objects here.
//     gallery.addVisual(new EatingHabits(ten));
//   }

//   ten.draw = function () {
//     ten.background(50, 255, 255);

//       for (i = 0; i < gallery.visuals.length; i++) {
//         gallery.visuals[i].draw();
//       }
    
//   }
// }

// var twoVis = new p5(sketchTwo);
// var oneVis = new p5(sketchOne);
// var threeVis = new p5(sketchThree);
// var fourVis = new p5(sketchFour);
// var fiveVis = new p5(sketchFive);
// var sixVis = new p5(sketchSix);
// //var sevenVis = new p5(sketchSeven);
// //var eightVis = new p5(sketchEight);
// var nineVis = new p5(sketchNine);
// var tenVis = new p5(sketchTen);

let screens = 9;
for(let k = 0; k < screens ;k++){
var sketches = function( ins ) { 
  //let snake, food, counter = 0;    // declare here as shared between setup and draw
  var x;
  var gallery;
  ins.setup = function () {
      canvasContainer = ins.select(`${k}`);
      var c = ins.createCanvas(500, 500);
//     var j = ten.createCanvas(500,500);
      c.parent(`${k}`);
      x = Math.random()*100;
      
      gallery = new Gallery();
      gallery.addVisual(new EatingHabits(ins));
      gallery.addVisual(new WorldData(ins));
      gallery.addVisual(new Nutrients(ins));
      gallery.addVisual(new BritishFoodAttitudes(ins));
      gallery.addVisual(new PayGapByJob2017(ins));
      gallery.addVisual(new PayGapTimeSeries(ins));
      gallery.addVisual(new TechDiversityGender(ins));
      gallery.addVisual(new ClimateChange(ins));
      gallery.addVisual(new TechDiversityRace(ins));
    };
  
    ins.draw = function() {
      ins.background(x, x, x);
      gallery.visuals[k].draw();
    };
  };

  var myp5 = new p5(sketches);
}