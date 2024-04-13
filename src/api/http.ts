import axios from "axios";

// TODO: 创建实列并设置默认参数
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // changeOrigin: true, // 跨域支持
    withCredentials: true
})

// TODO: 请求拦截器
instance.interceptors.request.use(
    config => {
        console.log(config.url)
        if(config.method === 'post') {
            config.data = {
                ...config.data,
                timestamp: Date.parse(new Date().toString()) / 1000
            }
        } else if (config.method === 'get') {
            config.params = {
                timestamp: Date.parse(new Date().toString()) / 1000,
                ...config.params
            }
        }
        return config
    },

    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// TODO: 响应拦截器
instance.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})



export default instance
