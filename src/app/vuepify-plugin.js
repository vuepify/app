import VueMeta from 'vue-meta';
import {VuepifyLayoutContent, VuepifyLiquid} from './components';
import {createVuepifyApp} from "./app";

export class VuepifyPlugin {
    static install(Vue, options) {
        new VuepifyPlugin(Vue, options);
    }

    /**
     * @typedef VuepifyOptions
     * @property {Boolean} isSSR
     * @property {ComponentOptions} EntityApp
     *
     * @param Vue {VueConstructor}
     * @param options {VuepifyOptions}
     */
    constructor(Vue, options) {
        this._options = options;
        this._Vue = Vue;
        this._loadDependencies();
        this._loadComponents();
        this._loadApp();
    }

    _loadDependencies() {
        this._Vue.use(VueMeta);
    }

    _loadComponents() {
        const components = [VuepifyLayoutContent, VuepifyLiquid]
        components.forEach(Component => this._Vue.component(Component.name, Component));
    }

    _loadApp() {
        const app = createVuepifyApp(this._options);
        Object.defineProperty(this._Vue.prototype, '$vuepify', {
            get: () => app,
            enumerable: true,
            configurable: false
        });
    }
}
