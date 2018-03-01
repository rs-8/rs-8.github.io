var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');

var mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

var prevDistances = [];

canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function copyDistances(particles) {
  particles.forEach(particle => {
    prevDistances.push(particle.distance);
  });
}

var timerIdDecr;

canvas.addEventListener('mousedown', (e) => {
  if (e.which == 1) {
    clearInterval(timerIdIncr);
    if (particles.length != 0) {
      copyDistances(particles);

      var minDistance = 0;
      timerIdDecr = setInterval(() => {
        particles.forEach(particle => {
          if(particle.distance <= minDistance)
            clearInterval(timerIdDecr);
          particle.distance -= 0.5;
        });
      }, 50);
    }
  }
});

var timerIdIncr;

canvas.addEventListener('mouseup', (e) => {
  if(e.which == 1) {
    clearInterval(timerIdDecr);

    timerIdIncr = setInterval(() => {
      for (let i = 0; i < particles.length; i++) {
        if(particles[i].distance >= prevDistances[i])
          clearInterval(timerIdIncr);
        particles[i].distance += 0.5; 
      }  
    }, 50);    
  }
})

function getRandomColor() {
  const colors = [
    '#9842b7',
    '#6b397c',
    '#211426'
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}

function getRandomRadians() {
  return Math.random() * 2 * Math.PI;
}

function getRandomDistanceBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Particle(x, y, radius, color, distance) {
  this.x = x;
  this.y = y;
  this.originX = x;
  this.originY = y;
  this.radius = radius;
  this.color = color;
  this.radians = getRandomRadians();
  this.speed = 0.04;
  this.distance = distance;
  this.lastMouse = { x: x, y: y };

  this.update = () => {
    if (this.x == canvas.width / 2 && this.y == canvas.height / 2)
      var lastPoint = { x: this.originX + Math.cos(this.radians) * this.distance, y: this.originY + Math.sin(this.radians) * this.distance };
    else
      var lastPoint = { x: this.x, y: this.y };

    this.radians += this.speed;

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.03;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.03;

    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distance;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distance;

    this.draw(lastPoint);
  }

  this.draw = lastPoint => {
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = this.radius;
    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(this.x, this.y);
    context.stroke();
    context.closePath();
  }
}

var particles = [];
function initParticles() {
  for (let i = 0; i < 150; i++) {
    var color = getRandomColor();
    var distance = getRandomDistanceBetween(80, 200);
    var particle = new Particle(canvas.width / 2, canvas.height / 2, 2, color, distance);
    particles.push(particle);
  }
}

function animate() {
  requestAnimationFrame(animate);

  context.fillStyle = 'rgba(255, 255, 255, 0.03)';
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle) => {
    particle.update();
  });
}

initParticles();

animate();


