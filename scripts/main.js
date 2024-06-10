import {
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
const inputNumField = document.getElementById("count");
// main();
let BALL_COUNT = 200;

//initialize balls
let BallStack = [];

function initBalls() {
  for(let oldBall of BallStack)
    oldBall.circle.remove()
  BallStack = [];
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
}

initBalls();

let lastTimeStamp = Date.now();
let mouse = { x: 0, y: 0, active: false };
let forcefieldRadius = 200;
let maxDeflectionForce = 500;
function setCoords(e) {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
  mouse.active = true;
}

container.addEventListener("mousemove", setCoords);
container.addEventListener("mouseenter", setCoords);
container.addEventListener("mouseleave", (e) => {
  mouse.active = false;
});

// let mouseEvent = new MouseEvent(container);
function deflectBalls() {
  BallStack.forEach((ball) => {
    const dx = ball.x - mouse.x;
    const dy = ball.y - mouse.y;
    const dist = Math.hypot(dx, dy);

    if (dist < forcefieldRadius) {
      const deflectAmount = dist / forcefieldRadius; //more the value mroe the deflection
      const ballSpeed = Math.hypot(ball.vx, ball.vy);
      const factor = (1 - deflectAmount) * ballSpeed;
      const nvx = deflectAmount * ball.vx + dx * factor;
      const nvy = deflectAmount * ball.vy + dy * factor;
      const nvmag = Math.hypot(nvx, nvy);
      ball.vx = nvx * (ballSpeed / nvmag);
      ball.vy = nvy * (ballSpeed / nvmag);
    }
  });
}
function update() {
  let temp = Date.now();
  let delta = temp - lastTimeStamp;
  // console.log(delta)
  lastTimeStamp = temp;
  for (let step = 0; step < PHYSICS_STEP; step++) {
    if (mouse.active) {
      deflectBalls();
    }
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
  // if (mouse.active) console.log(mouse.x, mouse.y);
}
// physcis loop

update();
inputNumField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    BALL_COUNT = inputNumField.value;
    initBalls();
  }
});
