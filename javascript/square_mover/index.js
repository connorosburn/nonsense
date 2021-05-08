import Vector from './Vector.js';
import Rectangle from './Rectangle.js';

let canvas = document.getElementById('stupid-square-mover');
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

let heldKeys = [];

document.addEventListener('keydown', (e) => {
    if (!heldKeys.includes(e.code)) {
        heldKeys.push(e.code)
    }
});
document.addEventListener('keyup', (e) => {
    heldKeys = heldKeys.filter(k => k != e.code);
});

window.onblur = () => { heldKeys = []; }

let meRect = new Rectangle({
    color: '#007F00',
    position: new Vector(0, 0),
    size: new Vector(canvas.height / 15, canvas.width / 15)
});
let otherRect = new Rectangle({
    color: 'orange',
    position: new Vector(canvas.width / 2, canvas.height / 2),
    size: new Vector(canvas.width / 10, canvas.height / 10)
});

const frameRate = 250;
const speed = 0.2;
const attemptMove = (o) => {
    if(!new Rectangle({position: meRect.getPosition().add(o), size: meRect.getSize()}).intersects(otherRect)) {
        meRect.move(o);
    } else {
        alert('GTFO GREEN');
    }
}
const interval = 1000 / frameRate;
setInterval(() => {
    let directionVector = new Vector(0, 0);
    heldKeys.forEach((k) => {
        switch(k) {
            case 'KeyW':
                directionVector = directionVector.add(new Vector(0, -1));
                break;
            case 'KeyS':
                directionVector = directionVector.add(new Vector(0, 1));
                break;
            case 'KeyA':
                directionVector = directionVector.add(new Vector(-1, 0));
                break;
            case 'KeyD':
                directionVector = directionVector.add(new Vector(1, 0));
                break;
        }
    });
    const offset = directionVector.unitVector().multiply(interval).multiply(speed);
    attemptMove(offset);
    let context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    meRect.render(context);
    otherRect.render(context);
}, interval);

