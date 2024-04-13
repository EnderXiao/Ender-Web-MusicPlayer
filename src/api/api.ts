import { Music, SearchParams } from '../store/type'
import request from './http'

// TODO: vercel配置
const baseIP = import.meta.env.BASE_IP;
const restString = `realIP=${baseIP}`

// TODO: 用户手机号登录
const userPhoneLogin = (params:object) => request.post('login/cellphone' + '?' + restString, params)

// TODO: 用户邮箱登录
const userEmailLogin = (params:object) => request.post('login', params)

// TODO: 游客登录
const anonymousLogin = () => request.get('/register/anonimous')

// TODO: 注销
const userLogout = () => request.get('/logout')

// TODO: 刷新登录
const getRefresh = () => request.get('/login/refresh')

// TODO: 获取登录状态
const getLoginStatus = () => request.post('/login/status')

// TODO: 获取验证码
const getCaptcha = (params:any) => request.post('/captcha/sent', params)


// TODO: 获取用户歌单
const getUserPlayList = (uid:string) => request.get(`/user/playList?uid=${uid}`)

// TODO: 获取音乐链接
const getSongUrl = (params:Music) => request.get(`song/url/v1?id=${params.id}&level=exhigh&${restString}`)

// TODO: 获取推荐新歌音乐
const getRecommendNewSong = () => request.get('/personalized/newsong' + '?' + restString)

// TODO: 获取音乐歌词
const getLyric = (id:string) => request.get(`/lyric?id=${id}`)

// TODO: 获取Mv
const getMv = () => request.get(`mv/first`);

// TODO: 搜索歌曲
const cloudsearch = (params:SearchParams) => request.get(
    `cloudsearch?keywords=${params.keywords}&limit=${params.limit}&offset=${params.offset}&type=${params.type}&${restString}`
);

// TODO: 并发请求控制
function multiRequest(urls: string[], maxNum: number): Promise<any> {
    return new Promise<any>((resolve: Function, reject: Function) => {
        // 请求列表
        const requestURLS = [...urls]
        // 请求结果
        const result: {[key:string]:any} = {}
        // 线程池
        let urlPool:string[] = [];
        const createTask = (url: string) => {
            urlPool.push(url);
            const onComplete = (err:any | null, res:any | null = null) => {
                if(urlPool.length === 0) {
                    resolve(urls.map(url => result[url]))
                }
                result[url] = err || res;
                urlPool = urlPool.filter(value => value !== url);
                if (urlPool.length < maxNum && requestURLS.length) {
                    createTask(requestURLS.pop() as string)
                }
            }
            request.get(url).then(
                data => { onComplete(null, data) },
                error => { onComplete(error) }
            )
        }
        while(requestURLS.length && urlPool.length < maxNum) {
            createTask(requestURLS.pop() as string)
        }
    })
}

export {
    userPhoneLogin,
    userEmailLogin,
    anonymousLogin,
    userLogout,
    getRefresh,
    getLoginStatus,
    getCaptcha,
    getUserPlayList,
    getSongUrl,
    getRecommendNewSong,
    getLyric,
    getMv,
    cloudsearch
}
