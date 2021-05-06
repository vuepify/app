import {DataBrowserHash, DataServerHash} from "../helpers";

class VuepifyApp {
    constructor({ isSSR }, { dataHash }) {
        this.isSSR = isSSR;
        this.dataHash = dataHash;
        this.rootVue = null;
        this.shopifyData = {};
        this._liquidCache = new Map();
    }

    setRootVue(vue) {
        this.rootVue = vue;
    }

    injectLiquidExpression(expression) {
        if (!this._liquidCache.has(expression)) {
            this._liquidCache.set(expression, this.processLiquidExpression(expression));
        }
        return this._liquidCache.get(expression)
    }

    processLiquidExpression(expression) { return expression }
}

class VuepifyServerApp extends VuepifyApp {
    constructor(options) {
        super(options, {
            dataHash: new DataServerHash()
        });
    }

    buildHeadTags() {
        const { title, meta } = this.rootVue.$meta().inject();
        return title.text() + meta.text();
    }

    processLiquidExpression(expression) {
        const key = this.dataHash.encode(expression);
        this.shopifyData[key] = `{{ ${expression} }}`;
        return this.shopifyData[key];
    }
}

class VuepifyBrowserApp extends VuepifyApp {
    constructor(options) {
        super(options, {
            dataHash: new DataBrowserHash()
        });
        this.EntityApp = options.EntityApp;
        this.loadShopifyData();
    }

    loadShopifyData() {
        function fetchData(variation) {
            const dataEl = document.querySelector(`[data-vuepify-shopify-data="${variation}"]`);
            const data = JSON.parse(dataEl.innerText);
            dataEl.remove();
            return data;
        }
        this.shopifyData = Object.assign(
            fetchData('layout'),
            fetchData('content')
        );
    }

    processLiquidExpression(expression) {
        const key = this.dataHash.encode(expression);
        return this.shopifyData[key];
    }
}

export function createVuepifyApp(options) {
    return options.isSSR ? new VuepifyServerApp(options) : new VuepifyBrowserApp(options);
}
