const margin = 0.9;
const loopDelay = 3 * 1000; // ms
let snowflake = [];
let currP;
let distance;
let newParticle;

function setup() {
  createCanvas(innerWidth, innerHeight);
  newParticle = () => new Particle(width / 2);
  currP = newParticle();
  fill("white");
  stroke("white");
  background(20);
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  background(20);
  snowflake.forEach((p) => drawP(p));
  newParticle = () => new Particle(width / 2);
}

function reset() {
  noLoop();
  setTimeout(() => {
    snowflake = [];
    background(20);
    loop();
  }, loopDelay);
}

function finished() {
  const constraint = (min(width, height) / 2) * margin;
  return snowflake.some((p) => {
    return p.distanceTo({ x: 0, y: 0 }) > constraint;
  });
}

function drawP(p) {
  for (let i = 0; i < 6; i++) {
    rotate(PI / 3);
    for (let j = 0; j < 2; j++) {
      scale(1, -1);

      point(p.x, p.y, p.diameter);
    }
  }
}

function draw() {
  translate(width / 2, height / 2);

  while (!currP.finished && !currP.touches(snowflake)) currP.update();

  drawP(currP);
  snowflake.push(currP);
  currP = newParticle();

  if (finished()) reset();
}
