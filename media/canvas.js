// import utils from './utils'

const canvas = document.getElementById('canvasteq')
const c = canvas.getContext('2d')

if (innerWidth > 480) {
canvas.width = (0.94 * innerWidth) - 17;
canvas.height = innerHeight-30;
}else{
  canvas.width = innerWidth -15;
  canvas.height = innerHeight - 15;  
}

const mouse = {
    x: (innerWidth - 17) / 2,
    y: (innerHeight - 17) / 2
}

const colors = ['#0ff', '#fff', '#00ff00', '#009999'];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
});

addEventListener('resize', () => {
    if (innerWidth > 480) {
canvas.width = (0.94 * innerWidth) - 17;
canvas.height = innerHeight-30;
}else{
  canvas.width = innerWidth - 15;
  canvas.height = innerHeight - 15;  
}


    init()
});

////////////////////////////////////////////////////

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}



////////////////////////////////////////////////////



// Objects
function Particle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color 
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.03;
    if (innerWidth < 620) {
        this.distanceFromCenter = randomIntFromRange (40,140);
    }
    else if (innerWidth < 1000){

        this.distanceFromCenter = randomIntFromRange (50,170);
    }
    else{
        this.distanceFromCenter = randomIntFromRange (60,190);
    }
    
    // this.lastMouse = {x: x, y: y};

    this.update = () => {

        const lastPoint = {x: this.x, y:this.y};
        ////////move points with time///////////////
        this.radians += this.velocity;


        /////////////////////////////drag effect///////////////////////

        // this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        // this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        //////////circular motion/////////////////////
        this.x = x +  Math.cos(this.radians) * this.distanceFromCenter;
        this.y = y +  Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    };

   this.draw = lastPoint => { 
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
};

}

// Implementation
let particles;
function init() {
    particles = [];
    if (innerWidth < 1000) {
        for (let i = 0; i < 20; i++) {
             const radius = (Math.random() * 2) + 1;
            particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
            }
   } 
   else{

    for (let i = 0; i < 24; i++) {
             const radius = (Math.random() * 2) + 1;
            particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
            }


   }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
     particle.update();
    });
}

init();
animate();







