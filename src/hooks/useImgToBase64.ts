import { onMounted } from "vue";

type Options = {
    el: string  // 用与检索图片标签的字符串
}

type Return = {
    baseURL: string | null
}

export default function(options: Options): Promise<Return> {
    const toBase64 = (el: HTMLImageElement):string => {
        // TODO: 创建canvas对象将图像画进去后利用toDataURL方法转base64编码
        const canvas: HTMLCanvasElement = document.createElement('canvas')
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        canvas.width = el.width
        canvas.height = el.height
        ctx.drawImage(el, 0, 0, canvas.width, canvas.height)

        return canvas.toDataURL('image/png')
    }
    return new Promise((resolve) => {
        onMounted(() => {
            const file: HTMLImageElement = document.querySelector(options.el) as HTMLImageElement
            file.onload = (): void => {
                resolve({
                    baseURL: toBase64(file)
                })
            }
        })
    })
}
