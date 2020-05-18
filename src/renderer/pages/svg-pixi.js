const parseSVG = require("svg-path-parser");
const svgPath = require("svg-path-properties");

export class SVGPixi extends PIXI.Graphics {
  constructor(path) {
    super();
    this.svgPathProperties = new svgPath.svgPathProperties(path);
    this.lineStyle(1.0, 0xffffff);
    this.readSvgPath(path);
  }

  readSvgPath(path) {
    parseSVG(path).forEach(row => {
      console.log(row);
      switch(row.code){
          case 'C':
                this.bezierCurveTo(row.x1, row.y1, row.x2, row.y2, row.x, row.y);
                break;
        case 'M':
            this.moveTo(row.x, row.y);
            break;
      }
    });
    this.closePath();
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
}
