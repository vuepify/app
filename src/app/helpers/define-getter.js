export function defineGetter({ object, name, value }) {
    Object.defineProperty(object, name, {
        get: () => value,
        enumerable: true,
        configurable: false
    });
}
