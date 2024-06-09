export default class Ball {
  UpdatePhysics = (delta = 16) => {
    this.x += (this.vx * delta) / 1000;
    this.y += (this.vy * delta) / 1000;
    this.UpdateRender();
  };
  UpdateRender = () => {
    this.circle.style.transform = `translate(${this.x}px, ${this.y}px)`;
  };

  init = (color,container) => {
    // let fill = document.createElement("div");
    this.fill.classList.add("ball__fill");
    this.fill.style.background = color;
    // this.fill = fill;
    this.circle.classList.add("ball");
    //give size to fill
    this.fill.style.height = `${2 * this.r}px`;
    this.fill.style.width = `${2 * this.r}px`;
    //centering the fill on (0,0) of container.
    this.fill.style.transform = `translate(-50%, -50%)`;

    //rendering the container and attaching the fill
    this.circle.appendChild(this.fill);
    container.appendChild(this.circle);

    // translating the container to move the circle
    this.circle.style.transform = `translate(${this.x}px, ${this.y}px)`;
  };
  constructor(x = 0, y = 0, r = 15, vx = 0, vy = 0, color = "#a5d",container) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.fill;
    this.circle = document.createElement("div");
    this.fill = document.createElement("div");
    this.init(color,container);
  }
}