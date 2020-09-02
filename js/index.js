// Event Listener
const startBtn = document.querySelector('#start-button');
startBtn.addEventListener('click', startGame);

//Function Start Game
function startGame() {
  // console.log('clicked')

  // Canvas
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.width = 500
  canvas.height = 700
  const ctx = canvas.getContext('2d')
  let x = 0
  let y = 0
  let id = null
  let score = 0

  // Adding Images
  const imgTrack = new Image();
  imgTrack.src = '/images/road.png'

  const imgCar = new Image();
  imgCar.src = '/images/car.png'

  // Classes
  class RaceTrack {
    constructor(img, x, y, w, h) {
      this.img = img;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h
    }

  }

  class Car {
    constructor(img, x, y, w, h) {
      this.img = img;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h
    }
  }

  class Obstacle {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
    drawRec() {
      ctx.fillStyle = 'red'
      // this.y++
      ctx.fillRect(this.x, this.y++, this.w, this.h)
    }
    detectCollision() {
      if (car.x < this.x + this.w &&
        car.x + car.w > this.x &&
        car.y < this.y + this.h &&
        car.y + car.h > this.y) {
        cancelAnimationFrame(id)
        console.log('Collision')
        alert(score++)
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
  }

  //  Creating Objects
  const raceTrack = new RaceTrack(imgTrack, 0, 0, canvas.width, canvas.height)
  const car = new Car(imgCar, 225, 580, 50, 100)
  const obstacles = [new Obstacle(100, 20, 100, 20), new Obstacle(325, 10, 100, 20)]

  // Draw Race Track Function
  function drawRaceTrack() {
    ctx.drawImage(raceTrack.img, raceTrack.x, raceTrack.y, raceTrack.w, raceTrack.h)
  }

  function drawCar() {
    ctx.drawImage(car.img, car.x, car.y, car.w, car.h)
  }

  function drawObstacles() {
    obstacles.forEach(function (obstacle) {
      obstacle.drawRec()
      obstacle.detectCollision()
    })
  }

  const randomObj = () => Math.random() * canvas.width

  setInterval(() => {
    obstacles.push(new Obstacle(randomObj(), 10, 100, 20))
  }, 2000);

  // Keyboard Function
  window.onkeydown = function (e) {
    // console.log(e.key)
    switch (e.key) {
      case 'ArrowLeft':
        car.x -= 20
        break;
      case 'ArrowRight':
        car.x += 20
        break;
    }

  }

  // Animation Function
  function animate() {
    id = requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawRaceTrack()
    drawCar()
    drawObstacles()
    score++
  }

  animate()
}