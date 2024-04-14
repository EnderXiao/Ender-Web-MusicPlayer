<template>
    <div class="ender-player">
        <audio
            ref="audio"
            :src="currentSong.src"
            @timeupdate="handleTimeUpdate"
            @durationchange="handleDurationChange"
            @ended="handleEnded"
        ></audio>
        <div class="ender-playerBox">
            <div class="ender-playerBox__left">
                <img :src="currentSong.cover + '?param=91y90'" @click="state.drawerShow = !state.drawerShow" />
                <div class="ender-playerBox__info">
                    <a>{{ currentSong.title }}</a>
                    <a>{{ currentSong.singer }}</a>
                </div>
            </div>
            <div class="ender-playerBox__middle">
                <!-- 音乐控制面板 -->
                <div class="ender-playerBox__buttonWrapper">
                    <a @click="modeSwitch">
                        <icon-solar-list-arrow-down-broken v-if="state.playModeNow === 0"></icon-solar-list-arrow-down-broken>
                        <icon-solar-repeat-one-broken v-else-if="state.playModeNow === 1"></icon-solar-repeat-one-broken>
                        <icon-solar-shuffle-broken v-else></icon-solar-shuffle-broken>
                    </a>
                    <a @click="prevSong">
                        <icon-solar-skip-previous-broken></icon-solar-skip-previous-broken>
                    </a>
                    <a @click="playSwitch">
                        <icon-solar-pause-broken v-if="state.isPlaying"></icon-solar-pause-broken>
                        <icon-solar-play-broken v-else></icon-solar-play-broken>
                    </a>
                    <a @click="nextSong">
                        <icon-solar-skip-next-broken></icon-solar-skip-next-broken>
                    </a>
                </div>
                <!-- 进度条 -->
                <div class="ender-playerBox__progressBar">
                    <span>{{ formatMusicTime(state.currentTime) }}</span>
                    <el-slider v-model="state.progress" :show-tooltip="false" @change="progressChange" style="width: 400px" />
                    <span style="margin-left: 18px">{{ formatMusicTime(state.duration) }}</span>
                </div>
            </div>
            <div class="ender-playerBox__right">
                <!-- 静音按键 -->
                <a @click="muteSwitch">
                    <icon-solar-volume-loud-broken></icon-solar-volume-loud-broken>
                </a>
                <!-- 音量条 -->
                <el-slider v-model="state.volume" @change="changeVolumes" style="width: 100px"></el-slider>
                <!-- 播放列表按键 -->
                <el-popover placement="top-start" :width="600" :show-arrow="false" :popper-style="'background-color:var(--theme-bg-color-3);height:600px;overflow:auto;overflow-x:hidden;border-color:var(--border-color);color:var(--theme-color);border-radius:30px'" trigger="click">
                    <template #reference>
                        <a>
                            <icon-solar-playlist-minimalistic-2-broken></icon-solar-playlist-minimalistic-2-broken>
                        </a>
                    </template>
                    <el-table :data="musicStore.songs">
                        <el-table-column property="date" label="歌曲名" >
                            <template #default="scope">
                                <div class="ender-popList__item">
                                    <span>{{ scope.row.title }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="120" label="歌手">
                            <template #default="scope">
                                <div class="ender-popList__item">
                                    <span>
                                        {{ scope.row.singer }}
                                    </span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="时间" width="120">
                            <template #default="scope">
                                <span>{{ formatTime(scope.row.time) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="100">
                            <template #default="scope">
                                <div class="ender-popList__buttonWrapper">
                                    <!-- Play Button -->
                                    <a @click="palyListMusic(scope.row)">
                                        <icon-solar-play-circle-broken></icon-solar-play-circle-broken>
                                    </a>
                                    <!-- Delete Button -->
                                    <a @click="deleteMusic(scope.row)">
                                        <icon-solar-trash-bin-minimalistic-broken></icon-solar-trash-bin-minimalistic-broken>
                                    </a>
                                    <!-- MV Button -->
                                    <a v-if="scope.row.mv">
                                        <icon-solar-clapperboard-open-play-broken></icon-solar-clapperboard-open-play-broken>
                                    </a>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-popover>
            </div>
        </div>
        <!-- 歌词界面 -->
        <el-drawer
            title=""
            :modal="false"
            direction="btt"
            v-model="state.drawerShow"
            destroy-on-close
            size="100%"
            ref="drawer"
            :style="'background-color: var(--theme-bg-color-deep);'"
        >
            <div class="ender-drawerBody">
                <div class="ender-drawerBody__banner">
                    <div class="ender-drawerBody__postContainer">
                        <div style="position: relative">
                            <el-image
                                style="width:350px;height:350px;box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);"
                                :src="currentSong.cover + '?param=350y350'"
                            >
                            </el-image>
                        </div>
                    </div>
                    <div class="ender-drawerBody__lyric">
                        <div class="ender-drawerBody__lyric__lyricContainer">
                            <p
                                v-for="(line, index) in state.currentLyrics"
                                :key="index"
                                :class="{ active: state.currentLyricLine === index }"
                            >
                                {{ line.text }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="ender-drawerBody__body">
                    <comment :id="currentSong.id"></comment>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
    
<script setup lang='ts'>
    import { formatTime } from '@/utils/script'
    import { getLyric } from '../../api/api';
    import { Music, PlayMode, LyricLine } from '../../store/type'
    const musicStore = MusicStore()
    const audio: Ref<HTMLAudioElement | undefined> = ref()
    const state = reactive<{
        progress: number,
        currentTime: number,
        duration: number,
        volume: number,
        drawerShow: boolean,
        isPlaying: boolean,
        playMode: PlayMode[],
        playModeNow: number,
        currentLyrics: LyricLine[] | null,
        currentLyricLine: number,
        lyricLoading: boolean,
    }>({
        progress: 0,
        currentTime: 0,
        duration: 0,
        volume: 50,
        drawerShow: false,
        isPlaying: false,
        playMode: [
            { id: 0, name: "列表循环", icon: "icon-solar-list-arrow-down-broken"},
            { id: 1, name: "单曲循环", icon: "icon-solar-repeat-one-broken" },
            { id: 2, name: "列表随机", icon: "icon-solar-shuffle-broken" },
        ],
        playModeNow: 0,
        currentLyrics: [],
        currentLyricLine: -1,
        lyricLoading: true,
    })
    const currentSong: Ref<Music> = computed(() => {
        if (state.playModeNow === 2) {
            return musicStore.getCurrentRandomSong
        } else {
            return musicStore.getCurrentSong
        }
    })
    // TODO: 侦听musicStore中的index的变化
    watch(() => musicStore.currentIndex, () => {
        playSong()
    })
    const parseLyrics = (lyrics: string):LyricLine[] | null => {
        if(!lyrics) return null
        // console.log(lyrics)
        const lines = lyrics.split("\n")
        return lines.map((value, index):LyricLine | null => {
            // TODO: 将一行歌词匹配出来，歌词格式为：
            // [00:00.00] 作曲：abb\n[00:01.105] 作词：abb\n
            // 则正则表达式为: 以\[开头，(\d{2})两个数字，一个:，
            // \d{2}两个数字，一个\.，2-3个数字，一个\]
            // 以及任意个非回车符.
            const matches = value.match(/^(\[(\d{2}):(\d{2}\.\d{2,3})\])+(.*)/)
            if(matches) {
                const minutes = parseInt(matches[2])
                const seconds = parseInt(matches[3])
                const text = matches[matches.length - 1].trim()
                return { time: minutes * 60 + seconds, text }  // 将时间转化为秒制，并将数据类型转换为对象
            } else {
                return null
            }
        }).filter((value) => value !== null) as LyricLine[]  // 筛选出不为null的行
    }
    const formatMusicTime = (time: number):string => {
        const min = Math.floor(time / 60);
        const sec = time % 60
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
    const playSong = () => {
        state.isPlaying = true
        nextTick(() => {
            if (audio.value) {
                // TODO: 如果是随机播放模式则返回随机列表中的歌曲
                audio.value.play()
            }
        })
    }
    const pauseSong = () => {
        state.isPlaying = false
        nextTick(() => {
            audio.value?.pause()
        })
    }
    const playSwitch = () => {
        if(state.isPlaying) {
            pauseSong()
        } else {
            playSong()
        }
    }
    // TODO: audio标签事件
    const handleDurationChange = () => {
        state.duration = Math.floor(audio.value?.duration as number)
    }
    const handleTimeUpdate = () => {
        state.currentTime = Math.floor(audio.value?.currentTime as number)
        state.progress = (state.currentTime / state.duration) * 100
        // console.log(state.currentTime, state.progress)

        if(!currentSong.value.Lyric) {
            updateLyric()
        } else {
            state.currentLyrics = parseLyrics(currentSong.value.Lyric)
        }
        if(!state.currentLyrics) return
        state.lyricLoading = false
        for(let i = 0; i < state.currentLyrics.length; i++) {
            if(state.currentTime < state.currentLyrics[i + 1].time) {
                state.currentLyricLine = i
                break
            }
        }

        // 更改歌词滚动位置
        const activeLine: HTMLLIElement = document.querySelector(".ender-drawerBody__lyric__lyricContainer p.active") as HTMLLIElement;
        // console.log(activeLine)
        // console.log(state.currentLyricLine)
        if(activeLine) {
            // 将歌词放到容器中间
            const container: HTMLUListElement = document.querySelector(".ender-drawerBody__lyric__lyricContainer") as HTMLUListElement
            // console.log(container)
            if (container) {
                container.scrollTop = activeLine.offsetTop - container.clientHeight / 2 + activeLine.clientHeight
            }
        }
    }
    const handleEnded = () => {
        switch (state.playModeNow) {
            case 0: // 顺序播放
                nextSong()
                break;
            case 1: // 单曲循环
                playSong()
                break;
            case 2: // 随机播放
                nextSong()
                break;
        }
    }

    const progressChange = (event: Event) => {
        let ct = (state.progress * state.duration) / 100;
        if(audio.value) {
            audio.value.currentTime = ct;
        }
    }
    const prevSong = () => {
        musicStore.prevIndex()
        playSong()
    }
    const nextSong = () => {
        musicStore.nextIndex()
        playSong()
    }
    const modeSwitch = () => {
        state.playModeNow = (state.playModeNow + 1) % state.playMode.length
        if(state.playModeNow === 2) {
            musicStore.updateShuffleSongs()
        }
    }

    // 加载歌词
    const updateLyric = () => {
        state.currentLyrics = []
        state.lyricLoading = true
        getLyric(currentSong.value.id).then(({ data }) => {
            let lyric = ""
            try {
                lyric = data.lrc.lyric
                console.log(lyric)
            } catch (error) {
                lyric = ""
                console.log(error);
            }
            state.lyricLoading = false
            musicStore.updateSongs({ Lyric: lyric })
        }, (error) => {
            console.log("getLyric error with: ", error)
        })
    }

    const changeVolumes = (val: number):void => {
        if(audio.value)
            audio.value.volume = val / 100
    }

    const deleteMusic = (params:Music) => {
        let deleteIndex = musicStore.songs.findIndex((item: Music) => item.id == params.id)
        if (deleteIndex == musicStore.currentIndex) {
            musicStore.nextIndex()
        }
        musicStore.deleteSongs(deleteIndex)
    }

    onMounted(async () => {
        pauseSong()
        if(audio.value)
            audio.value.src = currentSong.value.src as string;
        updateLyric()
    })
</script>
    
<style lang="scss" scoped>
@include b(popList) {
    @include e(item) {
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    @include e(buttonWrapper) {
        display: flex;
        align-items: start;

        a {
            margin: 0 5px;
        }
    }
}
@include b(player) {
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
    justify-content: center;
}
@include b(playerBox) {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
    color: var(--theme-color);
    @include e(left) {
        display: flex;
        flex-direction: row;
        // flex-grow: 0;
        // flex-shrink: 0;
        width: 400px;
        z-index: 9999;
        img {
            cursor: pointer;
            width: 91px;
        }
    }
    @include e(middle) {
        display: flex;
        flex: 2;
        flex-direction: column;
        z-index: 9999;
    }
    @include e(right) {
        display: flex;
        flex: 1;
        height: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        // position: absolute;
        z-index: 9999;
        padding: 0 20px;
        a {
            margin: 0 15px;
            * {
                width: 25px;
                height: 25px;
                margin-top: 5px;

            }
        }
    }
    @include e(info) {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        white-space: nowrap;
        a {
            padding: 8px;
            text-decoration: none;
            color: var(--theme-color);
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 15px;
            transition: 0.3s;
        }
    }
    @include e(buttonWrapper) {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
        a {
            margin: 0 15px;
            * {
                width: 25px;
                height: 25px;
                margin-top: 5px;
            }
        }
    }
    @include e(progressBar) {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        span {
            line-height: 32px;
            margin: 0 10px;
            width: 50px;
        }
    }
}
@include b(drawerBody) {
    height: 90%;
    @include e(banner) {
        display: flex;
        height: 90%;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin: 0 100px;
    }
    @include e(postContainer) {
        // margin-right: 150px;
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @include e(lyric) {
        overflow: hidden;
        position: relative;
        height: 100%;
        width: 100%;
        @include e(lyricContainer) {
            overflow-y: auto;
            height: 100%;
            width: 100%;
            padding: 240px 0;
            // transition: all .5s cubic-bezier(0.49, 0.21, 0.22, 0.84);
            scroll-behavior: smooth;
            &:hover {
                p {filter: blur(0);}
            }
            p {
                margin: 20px 0;
                padding: 0;
                width: 100%;
                opacity: 0.3;
                font-size: 35px;
                filter: blur(2px);
                font-weight: normal;
                color: var(--theme-color);
                transition: all 0.9s cubic-bezier(0.56, 0.17, 0.22, 0.76);
                text-align: left;
                text-shadow: 0px 2px 0px #ffffff00;
            }
            .active {
                color: var(--alert-color);
                font-size: 35px;
                font-weight: bold;
                opacity: 1.0;
                filter: blur(0);
                text-shadow: 0px 2px 10px var(--alert-color);
                transition: all 0.3s cubic-bezier(0.56, 0.17, 0.22, 0.76);
            }
        }
        // TODO: 使用两个渐变透明盒子遮挡住歌词
        &::before, &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 50%;
            background: linear-gradient(
                to top,
                rgba(255, 255, 255, 0) 0%,
                var(--theme-bg-color-deep) 100%
            );
            pointer-events: none;
            z-index: 2;
            opacity: 1;
            /* set initial opacity to 1 */
            transition: opacity 0.5s ease-in-out;
        }
        &::after {
            top: 50%;
            bottom: 0;
            background: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0) 0%,
                var(--theme-bg-color-deep) 100%
            );
        }
    }
}
</style>