let leaves = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // set canvas to fullscreen
  createLeaves();
}

function draw() {
  drawSky();
  drawGrass();
  drawLeaves();
}


// MOUSE INTERACTIONS
function mousePressed() {
  removeClickedLeaf();
}

function removeClickedLeaf() {
  // check each leaves position for mouse click
  // if found, remove leaf and end for loop
  // reference: https://www.youtube.com/watch?v=TaN5At5RWH8
  
  for (let i = 0; i < leaves.length; i++) {
    let mouseInsideLeaf = leaves[i].isInside(mouseX, mouseY);
    
    if (mouseInsideLeaf) {
      leaves.splice(i, 1); 

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break
      break; 
    }
  }
}

// HELPER FUNCTIONS
function createLeaves() {
  // Fill leaves array
  for (let i = 0; i < LEAF_COUNT; i++) {
    // create leaf at random x position
    let leaf = new Leaf(random(width), LEAF_SIZE, i);
    leaves.push(leaf); // add to leaves array
  }
}

function drawSky() {
  background(0, 200, 255); // sky blue
}

function drawGrass() {
  push(); // isolate styling to grass
  fill(10, 80, 50); // grass color
  let grassHeight = height * GRASS_HEIGHT; // calculate height of grass
  rect(0, height - grassHeight, width, grassHeight);
  pop();
}

function drawLeaves() {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  // update and display leaves 
  leaves.forEach((leaf) => {
    leaf.update();
    leaf.show();
  });
}

