import {
  BALL_COUNT,
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
  FRAMERATE,
  PHYSICS_STEP,
  MIN_R,
  MAX_R,
} from "./constants.js";
import {
  CheckCollisionCircleRect,
  CheckCollisionCircles,
  RandInt,
} from "./utils.js";
import Rect2D from "./Rect2D.js";
import Ball from "./Ball.js";

const container = document.getElementById("collision-field");
container.style.height = `${CONTAINER_HEIGHT}px`;
container.style.width = `${CONTAINER_WIDTH}px`;

// main();

//initialize balls
let BallStack = [];
for (let i = 0; i < BALL_COUNT; i++) {
  let r = RandInt(MIN_R, MAX_R);
  let newBall = new Ball(
    RandInt(r, CONTAINER_WIDTH - r),
    RandInt(r, CONTAINER_HEIGHT - r),
    r,
    RandInt(-150, 150),
    RandInt(-150, 150),
    `rgb(${RandInt(0, 255)},${RandInt(0, 255)},${RandInt(0, 255)})`,
    container
  );

  if (BallStack.length == 0) {
    BallStack.push(newBall);
    continue;
  }
  //check if new ball overlaps any old, if yes randomly repositon until no overlap
  let valid = true;
  do {
    valid = true;
    for (let ball of BallStack) {
      // console.log(newBall, ball);
      if (CheckCollisionCircles(newBall, ball, true)) {
        valid = false;
        newBall.x = RandInt(r, CONTAINER_WIDTH - r);
        newBall.y = RandInt(r, CONTAINER_HEIGHT - r);
        newBall.UpdateRender();
        // console.log("moved");
        break;
      }
    }
  } while (!valid);
  BallStack.push(newBall);
}

let lastTimeStamp = Date.now();


function update() {
  let temp = Date.now();
  let delta = temp - lastTimeStamp;
  // console.log(delta)
  lastTimeStamp = temp;
  for (let step = 0; step < PHYSICS_STEP; step++) {
    for (let i = 0; i < BallStack.length - 1; i++) {
      for (let j = i + 1; j < BallStack.length; j++) {
        CheckCollisionCircles(BallStack[i], BallStack[j]);
      }
    }
    for (let ball of BallStack) {
      CheckCollisionCircleRect(ball);
      ball.UpdatePhysics(delta / PHYSICS_STEP);
      // ball.UpdatePhysics(1000 / (FRAMERATE * PHYSICS_STEP));
    }
  }
  for (let ball of BallStack) ball.UpdateRender();
  // setTimeout(update, 1000 / 60);
  requestAnimationFrame(update);
}
// physcis loop
update();
