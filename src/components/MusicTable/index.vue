<template>
    <el-table class="ender-musicTable" :data="props.tableData">
        <el-table-column label="歌曲名" width="400">
            <template #default="scope">
                <div class="ender-musicTable__itemTitle">
                    <el-image class="ender-musicTable__itemImg" :src="scope.row.cover + '?param=28y28'" />
                    <span>{{ scope.row.title }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="歌手">
            <template #default="scope">
                <span>
                    {{ scope.row.singer }}
                </span>
            </template>
        </el-table-column>
        <el-table-column label="专辑">
            <template #default="scope">
                <span>{{ scope.row.album }}</span>
            </template>
        </el-table-column>
        <el-table-column label="时长" width="120">
            <template #default="scope">
                <span>{{ formatTime(scope.row.time) }}</span>
            </template>
        </el-table-column>
        <el-table-column width="130">
            <template #default="scope">
                <div class="ender-musicTable__buttonWrapper">
                    <!-- Play Button -->
                    <a @click="palyListMusic(scope.row)">
                        <icon-solar-play-circle-broken></icon-solar-play-circle-broken>
                    </a>
                    <!-- MV Button -->
                    <a v-if="scope.row.mv">
                        <icon-solar-clapperboard-open-play-broken></icon-solar-clapperboard-open-play-broken>
                    </a>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>
    
<script setup lang='ts'>
    import { formatTime } from '@/utils/script'
    import { getSongUrl } from '@/api/api'
    import { Music } from '../../store/type';
    const props = withDefaults(defineProps<{
        tableData: Array<any>
    }>(), {
        tableData: () => []
    })
    const musicStore = MusicStore()
    const palyListMusic = async (params:Music) => {
        // TODO: 检查是否存在播放列表
        const isExisting = musicStore.songs.findIndex((item:Music) => item.id == params.id)
        if(isExisting != -1) {
            // TODO: 如果存在直接播放
            musicStore.currentIndex = isExisting;
        } else {
            // TODO: 否则添加到播放列表
            getSongUrl(params).then((res) => {
                console.log(res)
                let newMusic:Music = {
                    title: params.title,
                    singer: params.singer,
                    cover: params.cover,
                    src: res.data[0].url,
                    time: params.time,
                    album: params.album,
                    id: params.id,
                    mv: params.mv,
                    Lyric: "",
                }
                musicStore.insertSongs(newMusic)
                musicStore.nextIndex()
            }, (error) => {
                console.log(error)
            })
        }
    }
</script>
    
<style lang="scss" scoped>
@include b(icon) {
    cursor: pointer;
    margin-left: 10px;
    @media screen and (max-width: 480px) {
		width: auto;
	}
}
@include b(musicTable) {
    width: 100%;
    display: flex;
    @include e(itemTitle) {
        display: flex;
        align-items: center;
    }
    @include e(itemImg) {
        flex-shrink: 0;
        border-radius: 6px;
        margin-right: 16px;
    }
    @include e(buttonWrapper) {
        display: flex;
        align-items: center;
        justify-content: start;
        a {
            text-decoration: none;
            margin: 0 10px;
            display: flex;
            align-items: center;
            * {
                width: 25px;
                height: 25px;
            }
        }
    }
}
</style>