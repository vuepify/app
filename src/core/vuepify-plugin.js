import VuepifyLayoutHead from "./vuepify-layout-head";
import VuepifyLayoutContent from './vuepify-layout-content';

const components = [
    VuepifyLayoutHead,
    VuepifyLayoutContent
]

export function VuepifyPlugin(Vue) {
    components.forEach(Component => Vue.component(Component.name, Component));
}
