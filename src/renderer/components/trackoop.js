import { SVGPixi } from "./svg-pixi";

export class TrackOOP extends PIXI.Container {
  constructor(path, tracklength) {
    super();
    this.track = new SVGPixi(path);
    this.track.zIndex = 2;
    this.readSvgPath(path);
    this.sortableChildren = true;
    this.tracklength = tracklength;
    this.pathLength = this.track.getTotalLength();
    this.sectors = [];
  }

  readSvgPath(path) {
    this.track.lineStyle(1.0, 0x000000);
    this.track.readSvgPath();
    this.track.closePath();
    this.redraw();
    this.addChild(this.track);
  }

  addPitlane(path) {
    this.pitlane = new SVGPixi(path);
    this.pitlane.lineStyle(1, 0xffffff);

    this.pitlane.zIndex = 1;

    this.pitlane.readSvgPath();
    this.addChild(this.pitlane);
  }

  addSector(path, sectorName, color = 0xff00ff) {
    this.sectors[sectorName] = new SVGPixi(path);
    this.sectors[sectorName].lineStyle(1, color);
    this.sectors[sectorName].zIndex = 3;

    this.sectors[sectorName].readSvgPath();
    this.addChild(this.sectors[sectorName]);
  }

  redraw() {
    const test = this.track.clone();

    this.track.geometry.graphicsData[1] = this.track.geometry.graphicsData[0].clone();
    this.track.geometry.graphicsData[1].lineStyle = this.track.geometry.graphicsData[0].lineStyle.clone();
    this.track.geometry.graphicsData[1].lineStyle.color = 0xffffff;
    this.track.geometry.graphicsData[1].lineStyle.width = 5;
    this.track.geometry.graphicsData[2] = this.track.geometry.graphicsData[0].clone();
    this.track.geometry.graphicsData[2].lineStyle = this.track.geometry.graphicsData[0].lineStyle.clone();
    this.track.geometry.graphicsData[2].lineStyle.color = 0x222222;
    this.track.geometry.graphicsData[2].lineStyle.width = 4;
    this.track.geometry.invalidate();

    // sectors
    this.drawMarker(800, "s2", 10, 2, 0xff0000, "S2");
    this.drawMarker(1758, "s3", 10, 2, 0xff00ff, "S3");

    // corner names
    this.drawMarker(150, "1", 10, 1, 0xf0f0f0, "1");

    // corner names
    this.drawMarker(260, "1", 10, 1, 0xf0f0f0, "2");
    this.drawMarker(380, "1", 10, 1, 0xf0f0f0, "3");
    this.drawMarker(410, "1", 10, 1, 0xf0f0f0, "4");
    this.drawMarker(444, "1", 10, 1, 0xf0f0f0, "5");
    this.drawMarker(570, "1", 10, 1, 0xf0f0f0, "6");
    this.drawMarker(845, "1", 10, 1, 0xf0f0f0, "7", 1);
    this.drawMarker(880, "1", 10, 1, 0xf0f0f0, "8", 1);
    this.drawMarker(925, "1", 10, 1, 0xf0f0f0, "9", 1);
    this.drawMarker(1065, "1", 10, 1, 0xf0f0f0, "9");
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

  drawMarker(point, name, length, width, color, placeText, textDistance = 14) {
    const first = this.track.getPointAtLength(point - 1);
    const middle = this.track.getPointAtLength(point);
    const second = this.track.getPointAtLength(point + 1);

    const test = this.createRect(0, 0, width, length, color);
    test.position.x = middle.x;
    test.position.y = middle.y;
    test.name = name;
    test.angle = this.angle360(first.x, first.y, second.x, second.y);
    if (placeText !== "") {
      let text = new PIXI.Text(placeText, {
        fontFamily: "Arial",
        fontSize: 8,
        fill: 0xffffff,
        align: "center"
      });
      text.pivot = { x: textDistance, y: 15 };
      text.angle = -this.angle360(first.x, first.y, second.x, second.y);
      text.resolution = 4;
      test.addChild(text);
    }
    this.addChild(test);
    test.zIndex = 4;
    return test;
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
  
  getPointAtLength(length) {
    return this.track.getPointAtLength(length);
  }
}
