class Vector {
    #underlying;
    constructor() {
        this.#underlying = Array.from(arguments);
    }

    x() {
        return this.#underlying[0];
    }

    y() {
        return this.#underlying[1];
    }

    add(vec) {
        const newValues = this.#underlying.map((element, i) => {
            return element + vec.#underlying[i];
        });
        return new Vector(...newValues);
    }

    multiply(value) {
        const newValues = this.#underlying.map((element) => {
            return element * value;
        });
        return new Vector(...newValues);
    }

    divide(value) {
        const newValues = this.#underlying.map((element) => {
            return element / value;
        });
        return new Vector(...newValues);
    }

    equals(vec) {
        for(let i = 0; i < this.#underlying.length; i++) {
            if(this.#underlying[i] != vec.#underlying[i]) {
                return false;
            }
        }
        return true;
    }

    dotProduct(vec) {
        let total = 0;
        for(let i = 0; i < this.#underlying.length; i++) {
            total += vec.#underlying[i] * this.#underlying[i];
        }
        return total;
    }

    unitVector() {
        const magnitude = Math.sqrt(Math.abs(this.dotProduct(this)));
        if(magnitude != 0) {
            return this.divide(Math.sqrt(Math.abs(this.dotProduct(this))));
        } else {
            const newValues = this.#underlying.map(() => 0);
            return new Vector(...newValues);
        }
    }
}

export default Vector;