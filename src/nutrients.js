function Nutrients(seven) {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Household Nutrient Intakes: 2001-2017';

  // Title to display above the plot.
  this.title = 'Household Nutrient Intakes: 2001-2017';

    // Names for each axis.
  this.xAxisLabel = 'year';
  this.yAxisLabel = 'Average intake as a percentage of weighted reference nutrient intakes';
    
  this.colors = [];

  var marginSize = 35;

  // Layout object to store all common plot layout parameters and
  // methods.
  this.layout = {
    marginSize: marginSize,

    // Locations of margin positions. Left and bottom have double margin
    // size due to axis and tick labels.
    leftMargin: marginSize * 2,
    rightMargin: seven.width - marginSize,
    topMargin: marginSize,
    bottomMargin: seven.height - marginSize * 2,
    pad: 5,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },

    // Boolean to enable/disable background grid.
    grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    numXTickLabels: 10,
    numYTickLabels: 8,
  };

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = seven.loadTable(
      './data/food/household-nutrients-0117.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
        self.setup();
      });

  };

  this.setup = function() {
    // Font defaults.
    seven.textSize(16);

    // Get min and max years:
    this.endYear = 2016;
    this.startYear = 2001;
    this.minY = 999;
    this.maxY = 0;
    this.series = {};
   
    //loop over all the rows
    for(var i = 0; i < this.data.getRowCount(); i++ )
    {
        var row = this.data.getRow(i);
        
        //if the series isn't there already add a new array
        if(this.series[row.getString(0)] == undefined)
        {
            this.series[row.getString(0)] = [];
            this.colors.push(seven.color(seven.random(0,255),seven.random(0,255),seven.random(0,255)));
        }
        
        for(var j = 1; j < this.data.getColumnCount(); j++)
        {
            this.minY =  seven.min(this.minY, row.getNum(j));
            this.maxY = seven.max(this.maxY, row.getNum(j));
            // we are assuming that the data is in chronological order
            this.series[row.getString(0)].push(row.getNum(j));
        }
    }
  };

  this.draw = function() {
    if (!this.loaded) {
      return;
    }

    // Draw the title above the plot.
    this.drawTitle();

    // Draw all y-axis labels.
    drawYAxisTickLabels(this.minY,
                        this.maxY,
                        this.layout,
                        this.mapYToHeight.bind(this),
                        0,
                        seven);

    // Draw x and y axis.
    drawAxis(this.layout, seven);

    // Draw x and y axis labels.
    drawAxisLabels(this.xAxisLabel,
                   this.yAxisLabel,
                   this.layout,
                   seven);

    // Plot all pay gaps between startYear and endYear using the width
    // of the canvas minus margins.
    var numYears = this.endYear - this.startYear;
    
    for(var i = 0; i < numYears; i++){
        // The number of x-axis labels to skip so that only
        // numXTickLabels are drawn.
        var xLabelSkip = seven.ceil(numYears / this.layout.numXTickLabels);
        
        y = this.startYear + i;
        // Draw the tick label marking the start of the previous year.
        if (i % xLabelSkip == 0) {
          drawXAxisTickLabel(y, this.layout,
            this.mapYearToWidth.bind(this),
          seven);
        }  
    }
      
    var legend = Object.keys(this.series);
   
    for(var j = 0; j < legend.length; j++){
        var previous = null;
        // Loop over all rows and draw a line from the previous value to
        // the current.
        for (var i = 0; i < this.series[legend[j]].length; i++) {
          // Create an object to store data for the current year.
          var current = {
            // Convert strings to numbers.
            'year': this.startYear + i,
            'percentage': this.series[legend[j]][i]
          };

          if (previous != null) {
            // Draw line segment connecting previous year to current
            // year pay gap.
            seven.stroke(this.colors[j]);
            seven.line(this.mapYearToWidth(previous.year),
                 this.mapYToHeight(previous.percentage),
                 this.mapYearToWidth(current.year),
                 this.mapYToHeight(current.percentage));
          } else {
            seven.push();
            seven.textAlign(seven.LEFT);
            seven.noStroke();
            seven.text(legend[j], 100 ,this.mapYToHeight(current.percentage) -20)  
            seven.pop();
          }

          // Assign current year to previous year so that it is available
          // during the next iteration of this loop to give us the start
          // position of the next line segment.
          previous = current;
        }
    }
  };

  this.drawTitle = function() {
    seven.fill(0);
    seven.noStroke();
    seven.textAlign('center', 'center');

    seven.text(this.title,
         (this.layout.plotWidth() / 2) + this.layout.leftMargin,
         this.layout.topMargin - (this.layout.marginSize / 2));
  };

  this.mapYearToWidth = function(value) {
    return seven.map(value,
               this.startYear,
               this.endYear,
               this.layout.leftMargin,   // Draw left-to-right from margin.
               this.layout.rightMargin);
  };

  this.mapYToHeight = function(value) {
    return seven.map(value,
               this.minY,
               this.maxY,
               this.layout.bottomMargin, // Smaller pay gap at bottom.
               this.layout.topMargin);   // Bigger pay gap at top.
  };
}
