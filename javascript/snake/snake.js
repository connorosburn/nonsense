import Vector from '../util/Vector';
import settings from './settings'

class Snake {
    #snakeSquares = [];
    #foodSquares = [];
    #updateThreshold = settings.STARTING_UPDATE_THRESHOLD;
    constructor() {
        const startX = Math.floor(settings.BOARD_DIMENSIONS.x() / 2);
        const startY = Math.floor(settings.BOARD_DIMENSIONS.y() / 2);
        this.#snakeSquares.push(new Vector(startX, startY));
        this.#addFood();
    }

    updateThreshold() {
        return this.#updateThreshold;
    }

    getScore() {
        return this.#snakeSquares.length;
    }

    gameIsOver() {
        const head = this.#snakeSquares[this.#snakeSquares.length - 1];
        for(let i = 0; i < this.#snakeSquares.length - 1; i++) {
            if(this.#snakeSquares[i].equals(head)) {
                return true;
            }
        }
        return (
            head.x() >= settings.BOARD_DIMENSIONS.x() || head.x() < 0 ||
            head.y() >= settings.BOARD_DIMENSIONS.y() || head.y() < 0
        );
    }

    #addFood() {
        const foodX = Math.floor(Math.random() * settings.BOARD_DIMENSIONS.x());
        const foodY = Math.floor(Math.random() * settings.BOARD_DIMENSIONS.y());
        this.#foodSquares.push(new Vector(foodX, foodY));
    }
    
    #directionFromInput(input) {
        switch(input) {
            case 'KeyW':
                return new Vector(0, -1);
            case 'KeyS':
                return new Vector(0, 1);
            case 'KeyA':
                return new Vector(-1, 0);
            case 'KeyD':
                return new Vector(1, 0);
            default:
                throw 'Invalid input';
        }
    }

    #foodIntersection(square) {
        for(let i = 0; i < this.#foodSquares.length; i++) {
            if(this.#foodSquares[i].equals(square)) {
                return i;
            }
        }
        return null;
    }

    update(inputBuffer) {
        if(inputBuffer.length > 1) {
            inputBuffer.shift();
        }
        const direction = this.#directionFromInput(inputBuffer[0]);
        const head = this.#snakeSquares[this.#snakeSquares.length - 1];
        this.#snakeSquares.push(head.add(direction));
        const food = this.#foodIntersection(head);
        if(food != null) {
            this.#foodSquares.splice(food, 1);
            this.#addFood();
            this.#updateThreshold -= settings.UPDATE_INCREMENT;
            if(this.#updateThreshold < settings.UPDATE_THRESHOLD_LIMIT) {
                this.#updateThreshold = settings.UPDATE_THRESHOLD_LIMIT;
            }
        } else {
            this.#snakeSquares.shift();
        }
        return inputBuffer;
    }

    #renderSnakeSquare(snakeSquare, context, squareSize) {
        context.fillStyle = settings.SNAKE_COLOR;
        const x = snakeSquare.x() * squareSize;
        const y = snakeSquare.y() * squareSize;
        context.fillRect(x, y, squareSize, squareSize);
    }

    #renderFoodSquare(foodSquare, context, squareSize) {
        context.fillStyle = settings.FOOD_COLOR;
        const x = (foodSquare.x() * squareSize) + settings.FOOD_MARGIN;
        const y = (foodSquare.y() * squareSize) + settings.FOOD_MARGIN;
        const renderSize = squareSize - (settings.FOOD_MARGIN * 2);
        context.fillRect(x, y, renderSize, renderSize);
    }

    render(canvas) {
        let context = canvas.getContext('2d');
        const squareSize = canvas.height / settings.BOARD_DIMENSIONS.x();
        this.#foodSquares.forEach(s => this.#renderFoodSquare(s, context, squareSize));
        this.#snakeSquares.forEach(s => this.#renderSnakeSquare(s, context, squareSize));
    }
};

export default Snake;