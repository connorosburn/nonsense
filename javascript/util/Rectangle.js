class Rectangle {
    #size;
    #position;
    #color;

    constructor(params) {
        this.#size = params.size;
        this.#position = params.position;
        this.#color = params.color;
    }

    move(offset) {
        this.#position = this.#position.add(offset);
    }

    getSize() {
        return this.#size;
    }
    
    getPosition() {
        return this.#position;
    }

    intersects(rect) {
        const  diff = rect.#size - this.#size;
        return (Math.abs((this.#position.x() + this.#size.x() / 2) - (rect.#position.x() + rect.#size.x() / 2)) * 2 < (this.#size.x() + rect.#size.x())) &&
                (Math.abs((this.#position.y() + this.#size.y() / 2) - (rect.#position.y() + rect.#size.y() / 2)) * 2 < (this.#size.y() + rect.#size.y()));
    }

    render(context) {
        context.fillStyle = this.#color;
        context.fillRect(this.#position.x(), this.#position.y(), this.#size.x(), this.#size.y());
    }
}

export default Rectangle;