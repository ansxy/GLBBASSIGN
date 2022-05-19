function Matrix() {
    this.a = 1; 
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
  }
  
  Matrix.prototype = {
  
      applyToPoint: function(p) {
        return {
          x: p.x * this.a + p.y * this.c + this.e,
          y: p.x * this.b + p.y * this.d + this.f
        }
      },
  
      transform: function(a2, b2, c2, d2, e2, f2) {
  
        var a1 = this.a,
            b1 = this.b,
            c1 = this.c,
            d1 = this.d,
            e1 = this.e,
            f1 = this.f;
  

        this.a = a1 * a2 + c1 * b2;
        this.b = b1 * a2 + d1 * b2;
        this.c = a1 * c2 + c1 * d2;
        this.d = b1 * c2 + d1 * d2;
        this.e = a1 * e2 + c1 * f2 + e1;
        this.f = b1 * e2 + d1 * f2 + f1;
      },
  
      rotate: function(angle) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle);
        this.transform(cos, sin, -sin, cos, 0, 0);
      },
  
      scale: function(sx, sy) {
        this.transform(sx, 0, 0, sy, 0, 0);
      },
  
      translate: function(tx, ty) {
        this.transform(1, 0, 0, 1, tx, ty);
      }
  };
  
  var m = new Matrix();   
  m.translate(50, 50);      
  m.rotate(3);            
  m.translate(-50, -50);
  
  var points = [
        {x: 0, y: 0},   
        {x: 100, y: 0},   
        {x: 100, y: 100},  
        {x: 0, y: 100}     
      ],
      result = [], i = 0, p;

while(p = points[i++]) result.push(m.applyToPoint(p));


var ctx = document.querySelector("canvas").getContext("2d");
ctx.translate(30, 30);

drawPolygon(result, "blue");

function drawPolygon(pts, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(pts[0].x, pts[0].y);
    for(var i = 1, p; p = pts[i++];) ctx.lineTo(p.x, p.y);
    ctx.closePath();
    ctx.stroke();
}