import VuepifyLayoutHead from "./vuepify-layout-head";
import VuepifyLayoutContent from './vuepify-layout-content';

const components = [
    VuepifyLayoutHead,
    VuepifyLayoutContent
]

export function VuepifyPlugin(Vue) {
    components.forEach(Component => Vue.component(Component.name, Component));
    Object.defineProperty(Vue.prototype, '$vuepifySSR', {
        get: () => window.VUEPIFY_SSR || { isSSR: false }
    });
}
