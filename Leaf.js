// Reference: https://github.com/nature-of-code/noc-examples-processing/blob/master/chp01_vectors/NOC_1_11_motion101_acceleration_array/Mover.pde


class Leaf {
  constructor(xPosition, size, index) {
    this.index = index;
    this.size = size;
    this.position = this.setPosition(xPosition);
    this.acceleration = this.setAcceleration();
    this.velocity = this.setVelocity();
    this.leafRed = LEAF_RED_MIN;
  }

  setPosition(xPosition) {
    let leafX = xPosition;
    let leafY = random(TOP_LEAF_HEIGHT, 0); // start leaves at different Y positions above canvas
    return createVector(leafX, leafY);
  }
  
  setVelocity() {
    return createVector(0, STARTING_VELOCITY);
  }
  
  calculateRandomAcceleration() {
    // create Vector with x set to accerlerate, stay constant, or deaccelerate
    return random([-1 * LEAF_X_ACC, LEAF_X_ACC]);
  }

  setAcceleration() {
    return createVector(this.calculateRandomAcceleration(), LEAF_Y_ACC);
  }

  updateAcceleration() {
    // Reference: https://github.com/nature-of-code/noc-examples-processing/blob/master/chp01_vectors/NOC_1_10_motion101_acceleration/NOC_1_10_motion101_acceleration.pde

    // update x acceleration to go left or right
    this.acceleration.set(
      this.calculateRandomAcceleration(),
      this.acceleration.y
    );
  }

  show() {
    this.constrainLeafPosition();
    this.drawLeaf();
  }

  constrainLeafPosition() {
    // Adjusted from Chat GPT convo about random vs constrain with vectors: https://chat.openai.com/share/fe365571-b165-4a4a-9846-1f2a8bca5c68
    let doubleLeafSize = LEAF_SIZE * 2;

    this.position.x = constrain(
      this.position.x,
      -1 * doubleLeafSize,
      width + doubleLeafSize
    );
    this.position.y = constrain(this.position.y, TOP_LEAF_HEIGHT, height);
  }

  drawLeaf() {
    push(); // limit styling to this method
    this.updateLeafColor();
    this.setLeafStroke();
    this.drawLeafShapes();
    pop();
  }
  
  updateLeafColor() {
    // fill inside of leaf color
    // As leafRed goes up, color goes from green to yellow
    fill(this.leafRed, 255, 100);
  }
  
  setLeafStroke() {
    stroke(5, 153, 72); // set stroke to bright green
    strokeWeight(2);
  }

  drawLeafShapes() {
    // reference: https://p5js.org/reference/#/p5/translate
    translate(this.position.x, this.position.y);

    // rotate leaf angle based off of index
    rotate((PI / 3.0) * (this.index * 0.4));
    ellipse(0, 0, 50, 80); // body
    rect(-5, -8, 10, 60); //stem
  }

  update() {
    this.updateAcceleration();
    this.velocity.add(this.acceleration); // update velocity
    this.position.add(this.velocity); // update position
    constrain(this.leafRed, LEAF_RED_MIN, LEAF_RED_MAX); // constrain value for Red in leaf color
    this.leafRed += (0.25 * this.index) / 20; //increment Red of leaf fill at a rate depending on leaf's index
  }

  isInside(px, py) {
    // Takes in positions and returns boolean depending on if they are inside of leaf or on
    // Reference: https://www.youtube.com/watch?v=TaN5At5RWH8&t=606s

    let inside = false; // set default to false

    // Reference: https://www.youtube.com/watch?v=TaN5At5RWH8&t=606s
    // calculate distance from mouse to center of the leaf shape
    let d = dist(px, py, this.position.x, this.position.y);

    // if distance is inside radius around leaf shape then return true
    let leafRadius = this.size / 2;
    if (d < leafRadius) {
      inside = true;
    }

    return inside;
  }
}
