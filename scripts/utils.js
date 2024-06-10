import Rect2D from "./Rect2D.js";
import {CONTAINER_HEIGHT,CONTAINER_WIDTH} from "./constants.js";
export const RandInt = (base, max) => {
  return Math.floor(Math.random() * (max - base) + base);
};

export const CheckCollisionCircles = (ballA, ballB, customHandle = false) => {
  let dist = Math.sqrt((ballA.x - ballB.x) ** 2 + (ballA.y - ballB.y) ** 2);
  let sum = ballA.r + ballB.r;
  if (dist > sum) return false;
  if (customHandle && dist <= sum) return true;
  // Handling detected collision
  if (!customHandle && dist <= sum) {
    // console.log("moved two balls");
    let newAvx =
      ((ballA.r ** 1.2 - ballB.r ** 1.2) / (ballA.r ** 1.2 + ballB.r ** 1.2)) *
        ballA.vx +
      ((2 * ballB.r ** 1.2) / (ballA.r ** 1.2 + ballB.r ** 1.2)) * ballB.vx;
    let newAvy =
      ((ballA.r ** 1.2 - ballB.r ** 1.2) / (ballA.r ** 1.2 + ballB.r ** 1.2)) *
        ballA.vy +
      ((2 * ballB.r ** 1.2) / (ballA.r ** 1.2 + ballB.r ** 1.2)) * ballB.vy;
    let newBvx =
      ((2 * ballA.r ** 1.2) / (ballA.r ** 1.2 + ballB.r ** 1.2)) * ballA.vx +
      ((ballB.r ** 1.2 - ballA.r ** 1.2) / (ballA.r ** 1.2 + ballB.r ** 1.2)) *
        ballB.vx;
    let newBvy =
      ((2 * ballA.r ** 1.2) / (ballA.r ** 1.2 + ballB.r ** 1.2)) * ballA.vy +
      ((ballB.r ** 1.2 - ballA.r ** 1.2) / (ballA.r ** 1.2 + ballB.r ** 1.2)) *
        ballB.vy;

    // TODO: Better default handler
    // console.log(newAvx, newAvy, newBvx, newBvy);
    ballA.vx = newAvx;
    ballA.vy = newAvy;
    ballB.vx = newBvx;
    ballB.vy = newBvy;

    // Resolve overlap statically
    let overlap = sum - dist;
    ballA.x -= (overlap * (ballB.x - ballA.x)) / dist;
    ballA.y -= (overlap * (ballB.y - ballA.y)) / dist;
    ballB.x += (overlap * (ballB.x - ballA.x)) / dist;
    ballB.y += (overlap * (ballB.y - ballA.y)) / dist;

    return true;
  }
};


export const CheckCollisionCircleRect = (
  circle,
  rect = "container",
  customHandle = false
) => {
  if (rect == "container") {
    rect = new Rect2D(0, 0, CONTAINER_WIDTH, CONTAINER_HEIGHT);
  }

  if (circle.x - circle.r <= rect.x) {
    circle.x = Math.max(circle.r, circle.x);
    circle.vx *= -1;
  }
  if (circle.x + circle.r >= rect.x + rect.width) {
    circle.x = Math.min(rect.x + rect.width - circle.r, circle.x);
    circle.vx *= -1;
  }
  if (circle.y - circle.r <= rect.x) {
    circle.y = Math.max(circle.r, circle.y);
    circle.vy *= -1;
  }
  if (circle.y + circle.r >= rect.y + rect.height) {
    circle.y = Math.min(rect.y + rect.height - circle.r, circle.y);
    circle.vy *= -1;
  }
};




