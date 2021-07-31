import Snake from './snake';

let canvas = document.getElementById('snake')

const parentHeight = document.getElementById('game-container').clientHeight;
const parentWidth = document.getElementById('game-container').clientWidth;

if(parentWidth < parentHeight) {
    canvas.width = parentWidth;
    canvas.height = parentWidth;
} else {
    canvas.width = parentHeight;
    canvas.height = parentHeight;
}

let inputBuffer = ['KeyD'];

const horizontal = (newKey, lastKey) => {
    return (newKey == 'KeyA' || newKey == 'KeyD') && lastKey != 'KeyA' && lastKey != 'KeyD';
}

const vertical = (newKey, lastKey) => {
    return (newKey == 'KeyW' || newKey == 'KeyS') && lastKey != 'KeyW' && lastKey != 'KeyS';
}

document.addEventListener('keydown', (e) => {
    const lastKey = inputBuffer[inputBuffer.length - 1]
    if(horizontal(e.code, lastKey) || vertical(e.code, lastKey)) {
        inputBuffer.push(e.code);
    }
});

const showScore = (snake, canvas, parent) => {
    canvas.remove();
    parent.innerHTML = `<p>You scored ${snake.getScore()}</p>`;
}

let snake = new Snake();
let lastUpdate = new Date().getTime();

let intervalId = setInterval(() => {
    const currentTime = new Date().getTime();
    if(currentTime - lastUpdate > snake.updateThreshold()) {
        if(snake.gameIsOver()) {
            clearInterval(intervalId);
            showScore(snake, canvas, document.getElementById('game-container'));
        } else {
            inputBuffer = snake.update(inputBuffer);
            lastUpdate = currentTime;
        }
    }
    let context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    snake.render(canvas);
}, 1000 / 60)

