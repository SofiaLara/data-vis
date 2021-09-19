function Gallery() {

  this.visuals = [];
  this.selectedVisual = null;
  var self = this;

  // Add a new visualisation
  this.addVisual = function (vis) {
    //Add visuals to array
    this.visuals.push(vis);

    // Preload data if necessary.
    if (vis.hasOwnProperty('preload')) {
      vis.preload();
      console.log('preload', vis);
    }
  };

  //Setup each vis on load
  this.initSetup = function () {
    for (i = 0; i < this.visuals.length; i++) {
      if (this.visuals[i].hasOwnProperty('setup')) {
        this.visuals[i].setup();
      }
    }
  };

  //Draw each vis on load
  this.initDraw = function () {
    for (i = 0; i < this.visuals.length; i++) {
      this.visuals[i].draw();
    }
  };
}