function EatingHabits(ten) {

  // Name of the visualisation.
  this.name = 'Eating habits';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  //Save all waffle data and objects
  var dataWaff;
  var waffle;

  //Save the day selected in the dropdown
  var daySelected;

  // Preload the data.
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
      // Callback function to set the value this.loaded to true.
      function () {
        self.loaded = true;
        self.setup();
      });
  };

  this.setup = function () {
    this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
      "Sunday"];
    
    this.habits = [];

    this.values = ['Take-away', 'Cooked from fresh', 'Ready meal', 'Ate out',
      'Skipped meal', 'Left overs'];

    this.pics = [takePic, cookPic, readyMealPic, mealOutPic, noMealPic, leftOverPic];

    //Loop over values to create an object that holds values and corresponding icons
    for (var i = 0; i < this.values.length; i++) {
      this.habits.push({
          "value": this.values[i],
          "pic": this.pics[i],
      });
    }

    // Create a select DOM element.
    this.dropdown = ten.createSelect();
    this.dropdown.parent('0');

    //Loops over the days array to fill the dropdown options
    for (var i = 0; i < this.days.length; i++) {
      this.dropdown.option(this.days[i]);
    }
  };

  this.draw = function () {
    if (!this.loaded) {
      return;
    }

    daySelected = this.dropdown.value();
    //Pass days argument to draw one waffle at a time when a day is selected.
    waffle = new Waffle(75, 75, 350, 350, 10, 10, dataWaff, daySelected, this.habits, ten);

    waffle.draw();
    waffle.checkMouse(ten.mouseX, ten.mouseY);
  };
}
