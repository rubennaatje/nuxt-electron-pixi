const parseSVG = require("svg-path-parser");
const svgPath = require("svg-path-properties");

export class SVGPixi extends PIXI.Graphics {
  constructor(path) {
    super();
    this.svgPathProperties = new svgPath.svgPathProperties(path);
    this.path = path;
  }

  readSvgPath() {
    parseSVG(this.path).forEach(row => {
      console.log(row);
      switch (row.code) {
        case "C":
          this.bezierCurveTo(row.x1, row.y1, row.x2, row.y2, row.x, row.y);
          break;
        case "M":
          this.moveTo(row.x, row.y);
          break;
        case "Z":
          this.closePath();
          break;
      }
    });
    // this.closePath();
  }

  getTotalLength() {
    return this.svgPathProperties.getTotalLength();
  }

  getPointAtLength(length) {
    return this.svgPathProperties.getPointAtLength(length);
  }

  getTangentAtLength(length) {
    return this.svgPathProperties.getTangentAtLength(length);
  }

  getAllPropertiesAtLength(length) {
    return this.svgPathProperties.getPropertiesAtLength(length);
  }

  getParts() {
    return this.svgPathProperties.getParts();
  }

  // extra parts

  createRect(x1, y1, x2, y2, color) {
    var graphics = new PIXI.Graphics();

    graphics.beginFill(color || 0x000000);
    //This is the point around which the object will rotate.
    graphics.position.x = x1 + x2 / 2;
    graphics.position.y = y1 + y2 / 2;

    // draw a rectangle at -width/2 and -height/2. The rectangle's top-left corner will
    // be at position x1/y1
    graphics.drawRect(-(x2 / 2), -(y2 / 2), x2, y2);
    graphics.name = "S1";
    return graphics;
  }

  angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    return theta;
  }
  angle360(cx, cy, ex, ey) {
    var theta = this.angle(cx, cy, ex, ey); // range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  }

  drawMarker(point, name, length, width, color, text = "", textDistance = 18) {
    const first = this.getPointAtLength(point - 1);
    const middle = this.getPointAtLength(point);
    const second = this.getPointAtLength(point + 1);

    const test = this.createRect(0, 0, width, length, color);
    test.position.x = middle.x;
    test.position.y = middle.y;
    test.name = name;
    test.angle = this.angle360(first.x, first.y, second.x, second.y);
    if (text !== "") {
      let text = new PIXI.Text("S1", {
        fontFamily: "Arial",
        fontSize: 8,
        fill: 0xffffff,
        align: "center"
      });
      text.pivot = { x: textDistance, y: 0 };
      text.angle = -this.angle360(first.x, first.y, second.x, second.y);
      text.resolution = 4;
      test.addChild(text);
    }
    this.addChild(test);
  }
}
