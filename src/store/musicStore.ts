import { defineStore } from "pinia";
import { MusicStoreState, Music } from "./type";


export const MusicStore = defineStore({
    id: "MusicState",

    state: ():MusicStoreState => {
        return {
            count: 0,

            // 歌曲缓存
            songs: [
				{ id: "27591651", title: 'Intro AE 86', singer: "陈光荣", album: "頭文字[イニシャル]D THE MOVIE SOUND TUNE", cover: "http://p4.music.126.net/9KeyafHLjadqSQTRS_tN5Q==/5741649720318487.jpg", src: 'http://music.163.com/song/media/outer/url?id=27591651.mp3', time: 149000, mv: "", Lyric: "" },
				{ id: "409872504", title: 'Ninelie', singer: "Aimer", album: "ninelie EP", cover: "http://p3.music.126.net/g7aakYG_Wfmrn1_IDfVUXA==/109951165050166241.jpg", src: 'http://music.163.com/song/media/outer/url?id=409872504.mp3', time: 260675, mv: "", Lyric: "" },
            ],
            shuffleSongs: [
                { id: "27591651", title: 'Intro AE 86', singer: "陈光荣", album: "頭文字[イニシャル]D THE MOVIE SOUND TUNE", cover: "http://p4.music.126.net/9KeyafHLjadqSQTRS_tN5Q==/5741649720318487.jpg", src: 'http://music.163.com/song/media/outer/url?id=27591651.mp3', time: 149000, mv: "", Lyric: "" },
				{ id: "409872504", title: 'Ninelie', singer: "Aimer", album: "ninelie EP", cover: "http://p3.music.126.net/g7aakYG_Wfmrn1_IDfVUXA==/109951165050166241.jpg", src: 'http://music.163.com/song/media/outer/url?id=409872504.mp3', time: 260675, mv: "", Lyric: "" },
            ],
            currentIndex: 0
        }
    },
    actions: {
        insertSongs(param: Music) {
            this.songs.splice(this.currentIndex + 1, 0, param)
        },
        nextIndex() {
            const len = this.songs.length
            this.currentIndex = (this.currentIndex + 1) % len
        },
        prevIndex() {
            const len = this.songs.length
            this.currentIndex = (this.currentIndex - 1 + len) % len
        },
        deleteSongs(index: number) {
            this.songs.splice(index, 1);
        },
        updateSongs(param: Array<Object> | Object) {
            this.songs[this.currentIndex] = Object.assign(this.songs[this.currentIndex], {...param})
            // this.updateShuffleSongs()
        },
        // TODO: shuffle算法，实现不同歌手的歌曲均匀分配
        updateShuffleSongs() {
            let singerMap: Map<string, Music[]> = new Map()
            let maxLen = 0
            // TODO: 按照歌手分类后，维护最大序列长度
            this.songs.forEach((value, index) => {
                if(singerMap.has(value.singer)) {
                    singerMap.get(value.singer)?.push(value)
                    maxLen = Math.max(maxLen, singerMap.get(value.singer)?.length as number)
                } else {
                    singerMap.set(value.singer, [value])
                    maxLen = Math.max(maxLen, 1)
                }
            })
            // TODO: 将所有序列填充到最大长度
            let newSongList:Music[] = []
            let keyList:string[] = Array.from(singerMap.keys)
            let muteSong:Music = {
                id: "-1",
                title: "",
                singer: "",
                album: "",
                cover: "",
                src: "",
                time: 0,
                mv: "",
                Lyric: ""
            }
            let firstDir = 0
            for (let key of keyList) {
                let value:Music[] = singerMap.get(key) as Music[]
                // TODO: 计算当前序列长度与最大长度的差
                let len = value.length
                let sub = maxLen - len
                let curIndex = 0
                let newList:Music[] = []
                // TODO: 计算需要填充的个数
                let avg = Math.floor(sub / len)
                if(avg === 0 && sub != 0) avg = 1
                // TODO: 随机初始化一个插入方向
                firstDir = Math.random() >= 0.5 ? 0 : 1 
                while(sub) {
                    let stepAvg = avg
                    let tmpList:Music[] = []
                    // TODO: 先将当前音乐插入
                    tmpList.push(value[curIndex++])
                    let dir = -1
                    while(stepAvg--) {
                        // 如果是第一次插入则设为初始方向
                        dir = dir === -1? firstDir : 1;
                        // 根据方向插入空音乐并切换方向
                        if(dir) {
                            tmpList.push(muteSong)
                            dir = 0
                        } else {
                            tmpList.unshift(muteSong)
                            dir = 1
                        }
                        sub--
                    }
                    newList.push(...tmpList)
                }
                // 更新为新序列
                if(newList.length !== 0)
                    value = [...newList]
            }
            // TODO: 取出map中的一列，以随机顺序加入序列
            let singerList:string[] = Array.from(singerMap.keys())
            const shuffle = (array: string[]) => {
                for(let i = array.length - 1; i >= 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]]
                }
                return array
            }
            let step = 0
            while(step < maxLen) {
                // TODO: 从每一个歌手的歌曲中拿出一个
                let tmpList = []
                singerList = shuffle(singerList)
                for(let k of singerList) {
                    let musicList:Music[] = singerMap.get(k) as Music[]
                    let music:Music = musicList[step] as Music
                    if(music.id !== "-1") {
                        tmpList.push(music)
                    }
                }
                if(newSongList.length > 0) {
                    // TODO: 如果当前得到的小序列的第一个与大序列的最后一个的作者相同，则把该歌曲放到小序列的最后
                    if(newSongList[newSongList.length - 1].singer === tmpList[0].singer) {
                        [tmpList[0], tmpList[tmpList.length - 1]] = [tmpList[tmpList.length - 1], tmpList[0]]
                    }
                }
                newSongList.push(...tmpList)
                step++;
            }
            console.log("shuffleSongs: ", newSongList)
            this.shuffleSongs = newSongList
        }
    },
    getters: {
        songListLen: (state):number => state.songs.length,
        getCurrentSong: (state):Music => state.songs[state.currentIndex],
        getCurrentRandomSong: (state):Music => state.shuffleSongs[state.currentIndex]
    },

    persist: {
        enabled: true,
        strategies: [
            {
                paths: ["songs"],
                storage: localStorage,
            },
        ],
    },
})