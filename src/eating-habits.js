function EatingHabits(ten) {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Eating habits';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'eating';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  //Save all waffle objects
  var dataWaff;
  var waffle;
  var daySelected;


  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function () {
    var self = this;
    leftOverPic = ten.loadImage('img/leftover.png');
    noMealPic = ten.loadImage('img/nomeal.png');
    takePic = ten.loadImage('img/take-away.png');
    cookPic = ten.loadImage('img/cooked.png');
    readyMealPic = ten.loadImage('img/readymeal.png');
    mealOutPic = ten.loadImage('img/out.png');
    dataWaff = ten.loadTable(
      './data/survey/finalData.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
        self.setup();
      });
  };

  this.setup = function () {
     if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
     }
    
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
		"Sunday"
    ];

    this.values = ['Take-away', 'Cooked from fresh', 'Ready meal', 'Ate out',
      'Skipped meal', 'Left overs'
    ];

    this.pics = [takePic, cookPic, readyMealPic, mealOutPic, noMealPic, leftOverPic];

    // Create a select DOM element.
    this.dropdown = ten.createSelect();
    this.dropdown.parent('0');

    for (var i =0; i< days.length; i++) {
      this.dropdown.option(days[i]);
    }
  };

  this.destroy = function () {
  };

  this.draw = function () {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
    daySelected = this.dropdown.value();
    waffle = new Waffle(50, 50, 400, 400, 10, 10, dataWaff, daySelected, this.values, this.pics, ten);

    waffle.draw();
    waffle.checkMouse(ten.mouseX, ten.mouseY);
  };
}
