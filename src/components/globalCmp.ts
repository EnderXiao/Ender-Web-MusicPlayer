import SvgIcons from './SvgIcons/index.vue'
import type { App } from 'vue';
const components: { [name: string]: Component } = { SvgIcons };
export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
    }
}