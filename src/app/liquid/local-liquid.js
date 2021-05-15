export class LocalLiquid {
    constructor(global) {
        this.global = global;
        this._locals = {};
    }

    define(name, expression) {
        this._locals[name] = this.global.define(expression);
    }

    use(name) {
        const data = this.global.use(this._locals[name]);
        if (data.includes('Liquid error:')) throw new Error(data);
        return data;
    }
}
