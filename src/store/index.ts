
import { createPinia, defineStore } from "pinia"
import { DEFAULT_PRIMARY } from "../config/config"
import piniaPluginPersist from 'pinia-plugin-persist'

interface UserInfo {
    id: number,
    userName: string,
    nickName: string,
    avatar: string
}

interface ThemeConfigInf {
    primary: string,
    darkMode: boolean
}

interface GlobalStoreInf {
    userInfo: UserInfo,
    isLogin: boolean,
    qrCode: string,
    themeConfig: ThemeConfigInf,
    anthologyObj: Object
}


export const GlobalStore = defineStore({
    // TODO: 定义store的唯一id
    id: "GlobalStore",
    // TODO: 创建state
    state: ():GlobalStoreInf => {
        return {
            // 用户信息
            userInfo: {
                id: 1,
                userName: 'Ender',
                nickName: 'EnderX',
                avatar: "https://img2.baidu.com/it/u=2979343759,1090469389&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            },
            // 登录状态
            isLogin: true,
            // 生成二维码
            qrCode: "",
            // 主题配置
            themeConfig: {
                primary: DEFAULT_PRIMARY,
                darkMode: false
            },
            // 视频选集信息
			anthologyObj: {}
        }
    },
    // 计算属性
    getters: {

    },

    // 方法
    actions: {
        setThemeConfig(themeConfig:ThemeConfigInf) {
            this.themeConfig = themeConfig
        }
    },

    // 开启数据缓存
    persist: {
        enabled: true,
        strategies: [
            {
                paths: ["themeConfig"],
                storage: localStorage,
            }
        ],
    },
})

// pinia持久化插件
const pinia = createPinia();
pinia.use(piniaPluginPersist)
export default pinia;