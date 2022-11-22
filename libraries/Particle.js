const angleScale = 2 / 3;
const spread = 2;

class Particle {
  constructor(d, diameter = 2) {
    this.x = d;
    this.y = 0;
    this.diameter = diameter;
  }

  get finished() {
    return this.x < 0;
  }

  distanceTo(p) {
    return Math.sqrt((this.x - p.x) ** 2 + (this.y - p.y) ** 2);
  }

  touches(obj) {
    if (obj.constructor === Array) return obj.some((p) => this.touches(p));

    return this.distanceTo(obj) <= (this.diameter + obj.diameter) / 2;
  }

  update(cb) {
    // TODO: Improve pathing
    this.x -= 1;
    this.y += randRange(-spread, spread);
    this.y = limit(this.y, -this.x * angleScale, this.x * angleScale);

    if (typeof cb === "function") {
      cb(this);
    }
  }
}
