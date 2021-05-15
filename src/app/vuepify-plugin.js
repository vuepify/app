import VueMeta from 'vue-meta';
import {VuepifyLayoutContent} from './components';
import {createVuepifyApp} from "./app";
import {defineGetter, pipe} from "./helpers";

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

        pipe(Vue, [
            Vue => Vue.use(VueMeta),
            this._loadApp.bind(this),
            Vue => Vue.mixin(this._app.liquid.createLocalMixin()),
            Vue => Vue.component(VuepifyLayoutContent.name, VuepifyLayoutContent)
        ]);
    }

    _loadApp(Vue) {
        this._app = createVuepifyApp(this._options);
        defineGetter({
            object: Vue.prototype,
            name: '$vuepify',
            value: this._app
        });
        return Vue;
    }
}
