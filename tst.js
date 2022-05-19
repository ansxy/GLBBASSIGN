var canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

let angle = 0.2;
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
    let wheel = 4;
    let points = [...Array(wheel).keys()]
      .map((it) => (it * 360.0) / wheel)
      .map((it) => it + x0 + y0)
      .map((it) => it * (Math.PI / 180))
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
    document.getElementById("dxpos").innerHTML = dxpos;
    document.getElementById("dypos").innerHTML = dypos;
    document.getElementById("friction").innerHTML = friction;
  }

  animate() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    requestAnimationFrame(() => this.animate());
    if (xpos + radius >= window.innerWidth || xpos - radius <= 0) {
      dxpos = -dxpos;
    }
    if (ypos + radius >= window.innerHeight || ypos - radius <= 0) {
      dypos = -dypos;
    }
    xpos += dxpos * velocity;
    ypos += dypos * velocity;

    velocity > 0 ? (velocity -= friction) : (velocity = 0);
    this.descr();
    this.draw();
  }

  draw() {
    let scaledRadius = Math.max(ypos, 0) / Math.max(window_height, 1);
    scaledRadius = 0.5 * (1.0 - scaledRadius);
    scaledRadius = 1.0 - scaledRadius;

    this.DrawCircle(xpos, ypos, radius * scaledRadius);
    this.DrawWheel(xpos, ypos, radius * scaledRadius);
  }
}

let m = new MidPoint();

let xpos = 100;
let ypos = 650;
let dxpos = 3;
let dypos = 1;
let velocity = 40;
let friction = 0.018;
let radius = 50;
let gravity = 0.1;
let things = rotate(xpos - 10, ypos - 10);

const drawRectByCorner = (context, corner1, corner2) => {
  context.fillRect(corner1, corner2, 20, 20); // x, y, width, height
};

function rotate(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
}
let f = new MidPoint();
f.draw();


$(document).ready(function () {
  $("#reset").click(function () {
    velocity = $("#Myinput").val();
    dxpos = $("#dxpos_input").val();
    dypos = $("#dypos_input").val();
    m.animate();
  });
});

// f.animate()

// drawRectByCorner(context,xpos,ypos);
