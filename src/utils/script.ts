

const formatTime = (songDateTime: number):string => {
    let min = Math.floor(songDateTime / 1000 / 60)
    let sec = Math.floor((songDateTime / 1000) % 60)
    // console.log(min, sec)
    let minString = min.toString()
    let secString = sec.toString()
    if(min < 10) {
        minString = '0' + min
    }
    if(sec < 10) {
        secString = '0' + sec
    }
    return minString + ":" + secString
}


// TODO: 防抖函数，即在某一段时间内，事件触发多次，只执行最后一次
function debounce(fn:Function, delay: number):Function {
    let timer: number
    return function() {
        const args = [...arguments]
        // 保存上下文
        const that = this
        // 如果计时器以及开启，但还没到时间则清空计时器并重新开启一个定时器
        if(timer) clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(that, args)
        }, delay);
    }
}


// TODO: 节流函数，即某一段时间内，事件多次触发，只执行第一次
function throttle(fn:Function, delay:number):Function {
    // 判断事件是否可执行
    let flg = true
    return function() {
        if(!flg) return
        const that = this
        const args = [...arguments]
        flg = false
        setTimeout(() => {
            fn.apply(that, args)
            flg = true
        }, delay)
    }
}

export {
    formatTime,
    debounce
}