let canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")


var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width
canvas.height = window_height


canvas.style.background = "#ff8";

class Circle{
    constructor(xpos,ypos,radius,color,dxpos,dypos,velocity,friction){
        this.xpos = xpos
        this.ypos = ypos
        this.radius = radius
        this.color = color
        this.dxpos = dxpos
        this.dypos = dypos
        this.velocity = velocity
        this.friction = friction

    }
    draw(context){
        context.clearRect(0,0,window.innerWidth,window.innerHeight)
        context.beginPath();
        context.lineWidth = 5
        context.arc(this.xpos,this.ypos,this.radius,0,Math.PI * 2 , false)
        context.stroke()
        context.closePath()
    }
    animate(){
        requestAnimationFrame(()=>this.animate())
        if(this.xpos + this.radius >= innerWidth || this.xpos - this.radius <=  0 ){
          this.dxpos = -this.dxpos
        }
        if(this.ypos + this.radius >= innerHeight || this.ypos - this.radius <= 0 ){
          this.dypos = -this.dypos
        }
        this.xpos += this.dxpos * this.velocity
        this.ypos += this.dypos * this.velocity

        if(this.dypos < 0 && this.dypos > -2.1){
          this.dypos = 0 
        }
        if(Math.abs(this.dxpos)<1.1){
          this.dxpos = 0 
        }

        this.velocity > 0 ? this.velocity -= this.friction : this.velocity = 0; 


        this.draw(context)
    }
}

var ball = {
  color : [
    "FFF"
  ],
  xpos : 255,
  ypos : 600,
  dxpos : 0,
  dypos : 100,
  velocity :3,
  friction : 0.1889

}

let my_circle = new Circle(ball.xpos,ball.ypos,50,"black",ball.dxpos,ball.dypos,ball.velocity,ball.friction)
my_circle.animate()