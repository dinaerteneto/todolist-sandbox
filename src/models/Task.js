export class Task {

    constructor(id, done, name, order) {
        this._id = id;
        this._done = done;
        this._name = name;
        this._order = order;
        Object.freeze(this);
    }

    get id() {
        return this._id;
    }

    get done() {
        return this._done;
    }

    get name() {
        return this._name;
    }

    get order() {
        return this._order;
    }

}