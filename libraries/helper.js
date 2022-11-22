function randRange(a, b) {
  return Math.random() * (b - a) + a;
}

function limit(n, min, max) {
  return Math.max(Math.min(n, max), min);
}
