var canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

var window_height = window.innerHeight / 1.5;
var window_width = window.innerWidth / 1.5;

let topp = 0;
let left = 0;
canvas.width = window_width;
canvas.height = window_height;

let paused = false;
class MidPoint {
  consturctor() {}
  DrawPixel(x, y) {
    context.fillRect(x, y, 1, 1);
  }
  DrawCircle(x0, y0, radius) {
    let x = radius;
    let y = 0;
    let radiusError = 1 - x;
    while (x >= y) {
      this.DrawPixel(x + x0, y + y0);
      this.DrawPixel(y + x0, x + y0);
      this.DrawPixel(-x + x0, y + y0);
      this.DrawPixel(-y + x0, x + y0);
      this.DrawPixel(-x + x0, -y + y0);
      this.DrawPixel(-y + x0, -x + y0);
      this.DrawPixel(x + x0, -y + y0);
      this.DrawPixel(y + x0, -x + y0);
      y++;

      if (radiusError < 0) {
        radiusError += 2 * y + 1;
      } else {
        x--;
        radiusError += 2 * (y - x + 1);
      }
    }
  }
  // Mengambar garis ditengah kotak
  DrawWheel(x0, y0, radius) {
    let roda = 4;
    let points = [...Array(roda).keys()]
      //Ngebagi 360 derajat menjadi "roda" bagian
      .map((it) => (it * 360.0) / roda)
      .map((it) => it + x0 + y0)
      .map((it) => it * (Math.PI / 180)) // Merubah derajat menjadi radians
      .map((it) => [x0 + radius * Math.cos(it), y0 + radius * Math.sin(it)])
      .forEach((it) => {
        let [x, y] = it;
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x, y);
        context.stroke();
      });
  }
  descr() {
    document.getElementById("velocity").innerHTML = velocity;
    document.getElementById("dxpos").innerHTML = ball.x - 100;
    document.getElementById("moveY").innerHTML =
      ball.y - window_height + radius;
  }

  animate() {
    if (paused) {
      return;
    }
    requestAnimationFrame(() => this.animate());
    // Ground Limit
    if (ball.y >= window_height - ball.radius) {
      //Bolanya akan mentul juka menyentuh besar tinggi dari layar
      ball.y = window_height - ball.radius;
      ball.vy = -(ball.vy * ball.elasticity);
    }

    //Wall Limit
    if (ball.x >= window_width - ball.radius || ball.x <= left + ball.radius) {
      ball.x =
        ball.x < left + ball.radius
          ? left + ball.radius
          : window_width - ball.radius;
      ball.vx = -(ball.vx * ball.elasticity);
    }

    //Gravity
    ball.vy += gravity;

    ball.x += ball.vx * velocity;
    ball.y += ball.vy;

    velocity > 0 ? (velocity -= friction) : (velocity = 0);

    this.draw();
  }

  draw() {
    context.clearRect(0, 0, window_width, window_height);
    let scaledRadius = Math.max(ball.y, 0) / Math.max(window_height, 1);
    scaledRadius = 0.5 * (1.0 - scaledRadius);
    scaledRadius = 1.0 - scaledRadius;
    this.DrawCircle(ball.x, ball.y, ball.radius * scaledRadius);
    this.DrawWheel(ball.x, ball.y, ball.radius * scaledRadius);
    this.descr();
  }
  stopAnimation() {
    cancelAnimationFrame(this.animate());
  }
}

let friction = 0.2;
let velocity = 0;
let radius = 50;
let gravity = 2;
var ball = {
  x: 100,
  y: window_height - radius,
  vx: 1,
  vy: 1,
  elasticity: 1,
  radius: radius,
};

let m = new MidPoint();
m.draw();

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);

function handleMouseDown(e) {
  ball.x = e.pageX - canvas.offsetLeft;
  ball.y = e.pageY - canvas.offsetTop;
  ball.vx = ball.vy = 0;
  paused = true;
}

function handleMouseUp(e) {
  ball.vx = e.pageX - canvas.offsetLeft - ball.x;
  velocity += e.pageX - canvas.offsetLeft - ball.x;
  ball.vy = e.pageY - canvas.offsetTop - ball.y;
  paused = false;
  m.animate();
}

$(document).ready(function () {
  $("#StartAnimation").click(function () {
    velocity = $("#Myinput").val();
    ball.vx = $("#dxpos_input").val();
    ball.y = window_height - ball.radius - $("#moveY_input").val();
    m.animate();
  });
  $("#stop").click(function () {
    paused = true;
  });
  $("#play").click(function () {
    paused = false;
    m.animate();
  });
  $("#reset").click(function () {
    ball.x = 100;
    ball.y = window_height - radius;
    ball.vx = 0;
    ball.vy = 0;

    m.draw();
  });
});
