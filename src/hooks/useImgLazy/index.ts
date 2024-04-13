import type { Directive, App, DirectiveBinding } from "vue";


const imgLazy = async (el: HTMLImageElement, binding: DirectiveBinding) => {
    // console.log("v-lazy: ", el)
    // 获取默认图片
    const def = await import("../../assets/svgIcons/ender.svg")
    // 设置默认图片
    el.src = def.default
    const observer = new IntersectionObserver((entries) => {
        // 出现在视口后
        if(entries[0].intersectionRatio > 0) {
            // 设置图片
            el.src = binding.value
            // 清除监听
            observer.unobserve(el)
        }
    })
    // 绑定监听
    observer.observe(el)
}

const install = (app: App) => {
    app.directive("imgLazy", {
        mounted(el: HTMLImageElement, binding) {
            imgLazy(el, binding)
        }
    })
}

imgLazy.install = install

export default imgLazy