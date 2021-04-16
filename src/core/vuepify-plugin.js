import VueMeta from 'vue-meta';
import { VuepifyLayoutContent } from './components/layout';

const components = [VuepifyLayoutContent];

export function VuepifyPlugin(Vue) {
    Vue.use(VueMeta);

    components.forEach(Component => Vue.component(Component.name, Component));
}
