import {DataBrowserHash, DataServerHash, defineGetter, pipe} from "../helpers";
import {LocalLiquid} from "./local-liquid";

class GlobalLiquid {
    constructor(dataHash) {
        this.dataHash = dataHash;
        this.data = {};
    }

    use(key) {
        return this.data[key];
    }

    createLocalMixin() {
        const global = this;

        return {
            beforeCreate() {
                const local = new LocalLiquid(global);
                const definitions = this.$options.liquid || {};
                Object.keys(definitions).forEach(key => local.define(key, definitions[key]));
                this.$liquid = new Proxy({}, {
                    get(_, key) {
                        if (key in definitions) return local.use(key);
                    }
                });
            }
        }
    }

    define(expression) {
        return pipe(expression, [
            pipe.replace(/"/g, "'"),
            expression => ({
                key: this.dataHash.encode(expression),
                value: expression
            })
        ]);
    }
}

class GlobalServerLiquid extends GlobalLiquid {
    constructor() {
        super(new DataServerHash());
    }

    define(expression) {
        const { key, value } = super.define(expression);
        this.data[key] = `{{ ${value} }}`;
        return key;
    }
}

class GlobalBrowserLiquid extends GlobalLiquid {
    constructor() {
        super(new DataBrowserHash());
        this._loadData();
    }

    _loadData() {
        function fetchData(variation) {
            const dataEl = document.querySelector(`[data-vuepify-shopify-data="${variation}"]`);
            const data = JSON.parse(dataEl.innerText);
            dataEl.remove();
            return data;
        }
        this.data = pipe({}, [
            pipe.merge(fetchData('layout')),
            pipe.merge(fetchData('content'))
        ]);
    }

    define(expression) {
        return super.define(expression).key;
    }
}

export function createGlobalLiquid(isSSR) {
    return isSSR ? new GlobalServerLiquid() : new GlobalBrowserLiquid();
}
