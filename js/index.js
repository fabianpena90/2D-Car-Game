const canvas = document.querySelector("canvas");
canvas.width = 500;
canvas.height = 700;
const ctx = canvas.getContext("2d");
const carImg = new Image();
carImg.src = "/images/car.png";
const roadImg = new Image();
roadImg.src = "/images/road.png";
let id = null
let score = 0
class Car {
  constructor(img, x, y, w, h) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  drawCar() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

let miniCooper = new Car(carImg, 250, 600, 50, 100);

let bullets = []

window.onkeydown = function (event) {
  console.log(event.key);
  switch (event.key) {
    case "ArrowLeft":
      miniCooper.x -= 7;
      break;
    case "ArrowRight":
      miniCooper.x += 7;
      break;
    case " ":
        bullets.push(new Bullet(miniCooper.x, miniCooper.y, 10, 10))
        break;
  }
};

class Obstacle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "#"+((1<<24)*Math.random()|0).toString(16);
  }

  drawObstacle = () => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y++, this.w, this.h);
  };
  checkCollision = () => {
    if (miniCooper.x < this.x + this.w &&
      miniCooper.x + miniCooper.w > this.x &&
      miniCooper.y < this.y + this.h &&
      miniCooper.y + miniCooper.h > this.y) {
      window.cancelAnimationFrame(id)
      alert(score)
    }
    for(let bullet of bullets){
      if (bullet.x < this.x + this.w &&
        bullet.x + bullet.w > this.x &&
        bullet.y < this.y + this.h &&
        bullet.y + bullet.h > this.y) {
        obstacless.splice(obstacless.indexOf(this), 1)
        bullets.splice(bullets.indexOf(bullet), 1)
      }
    }
  }
}

class Bullet {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  drawBullet(){
    ctx.fillStyle = "black"
    ctx.fillRect(this.x, this.y, this.w, this.h)
    this.y--
  }
}

let obstacless = [
  new Obstacle(100, 20, 100, 20),
  new Obstacle(200, 50, 100, 20),
  new Obstacle(0, 80, 100, 20),
];
let random = () => Math.floor(Math.random() * canvas.width);
setInterval(function () {
  obstacless.push(new Obstacle(random(), 0, 100, 20));
}, 1000);

var rect1 = { x: 5, y: 5, width: 50, height: 50 }
var rect2 = { x: 20, y: 10, width: 10, height: 10 }

function collision() {

}

// collision detected!


function animate() {
  id = window.requestAnimationFrame(animate);
  console.log("gameloop");
  ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
  miniCooper.drawCar();
  for (obs of obstacless) {
    obs.drawObstacle();
    obs.checkCollision();
  }
  for (bullet of bullets) {
    bullet.drawBullet();
    //bullet.checkCollision();
  }
score++
}
animate();