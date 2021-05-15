import {createGlobalLiquid} from "../liquid";

class VuepifyApp {
    constructor({ isSSR }) {
        this.isSSR = isSSR;
        this.rootVue = null;
        this.liquid = createGlobalLiquid(isSSR);
    }

    setRootVue(vue) {
        this.rootVue = vue;
    }
}

class VuepifyServerApp extends VuepifyApp {
    buildHeadTags() {
        const { title, meta } = this.rootVue.$meta().inject();
        return title.text() + meta.text();
    }
}

class VuepifyBrowserApp extends VuepifyApp {
    constructor(options) {
        super(options);
        this.EntityApp = options.EntityApp;
    }
}

export function createVuepifyApp(options) {
    return options.isSSR ? new VuepifyServerApp(options) : new VuepifyBrowserApp(options);
}
