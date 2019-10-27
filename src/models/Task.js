export class Task {

    constructor(id, done, name) {
        this._id = id;
        this._done = done;
        this._name = name;
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

}