import type { DirectiveBinding, App } from 'vue';

declare const imgLazy: {
    (el: HTMLImageElement, binding: DirectiveBinding) : void,
    install: (app: App) => void
}

export default imgLazy