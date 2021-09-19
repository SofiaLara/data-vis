function PayGapByJob2017(five) {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Pay gap by job: 2017';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Graph properties.
  this.pad = 20;
  this.dotSizeMin = 15;
  this.dotSizeMax = 40;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function () {
    var self = this;
    this.data = five.loadTable(
      './data/pay-gap/occupation-hourly-pay-by-gender-2017.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function () {
        self.loaded = true;
      });
  };

  this.setup = function () {
  };

  this.draw = function () {
    if (!this.loaded) {
      return;
    }

    // Draw the axes.
    this.addAxes();

    // Get data from the table object.
    var jobs = this.data.getColumn('job_subtype');
    var propFemale = this.data.getColumn('proportion_female');
    var payGap = this.data.getColumn('pay_gap');
    var numJobs = this.data.getColumn('num_jobs');

    // Convert numerical data from strings to numbers.
    propFemale = stringsToNumbers(propFemale);
    payGap = stringsToNumbers(payGap);
    numJobs = stringsToNumbers(numJobs);

    // Set ranges for axes.
    // Use full 100% for x-axis (proportion of women in roles).
    var propFemaleMin = 0;
    var propFemaleMax = 100;

    // For y-axis (pay gap) use a symmetrical axis equal to the
    // largest gap direction so that equal pay (0% pay gap) is in the
    // centre of the canvas. Above the line means men are paid
    // more. Below the line means women are paid more.
    var payGapMin = -20;
    var payGapMax = 20;

    // Find smallest and largest numbers of people across all
    // categories to scale the size of the dots.
    var numJobsMin = five.min(numJobs);
    var numJobsMax = five.max(numJobs);

    five.fill(255);
    five.stroke(0);
    five.strokeWeight(1);

    for (i = 0; i < this.data.getRowCount(); i++) {
      // Draw an ellipse for each point.
      five.ellipse(
        five.map(propFemale[i], propFemaleMin, propFemaleMax,
          this.pad, five.width - this.pad),
        five.map(payGap[i], payGapMin, payGapMax,
          five.height - this.pad, this.pad),
        five.map(numJobs[i], numJobsMin, numJobsMax,
          this.dotSizeMin, this.dotSizeMax)
      );
    }
  };

  this.addAxes = function () {
    five.stroke(200);

    // Add vertical line.
    five.line(five.width / 2,
      0 + this.pad,
      five.width / 2,
      five.height - this.pad);

    // Add horizontal line.
    five.line(0 + this.pad,
      five.height / 2,
      five.width - this.pad,
      five.height / 2);
  };
}
