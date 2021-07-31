import Vector from "../util/Vector";

const settings = {
    BOARD_DIMENSIONS: new Vector(20, 20),
    SNAKE_COLOR: 'blue',
    FOOD_COLOR: 'red',
    FOOD_MARGIN: 4,
    STARTING_UPDATE_THRESHOLD: 150,
    UPDATE_INCREMENT: 5,
    UPDATE_THRESHOLD_LIMIT: 35
};
export default settings;