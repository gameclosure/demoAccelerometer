import ui.TextView as TextView;
import accelerometer;

exports = Class(GC.Application, function () {
  this.initUI = function () {

    // create an 'arrow' pointing down by default
    var textWidth = this.view.style.width;
    var textHeight = this.view.style.height / 2;

    // create an arrow
    this.arrow = new TextView({
      superview: this.view,
      x: 0,
      y: (this.view.style.height / 2) - (textHeight / 2),
      width: textWidth,
      height: textHeight,
      text: "-->",
      color: "white",
      r: Math.PI / 2,
      anchorX: textWidth / 2,
      anchorY: textHeight / 2,
      autoFontSize: true
    });

    // turn off accelerometer reading on hide, on on show
    GC.on('hide', function () { accelerometer.stop(); });
    GC.on('show', bind(this, function () { this.startAccel(); }));

    // start reading the accelerometer
    this.startAccel();
  };

  this.startAccel = function () {
    var pi = Math.PI;
    var pi2 = pi / 2;
    var atan2 = Math.atan2;

    accelerometer.start(bind(this, function(evt) {

      // calculate the angles
      var forwardTilt = atan2(-evt.z, -evt.y);
      var tilt = atan2(-evt.x, -evt.y);
      var twist = atan2(-evt.x, -evt.z);

      // rotate the arrow with tilt
      this.arrow.style.r = pi2 + tilt;

      // log some about the device orientation
      logger.log(
       'x', evt.x,
       'y', evt.y,
       'z', evt.z,

       'forwardTilt', forwardTilt,
       'tilt', tilt,
       'twist', twist
      );

    }));
  };

});
