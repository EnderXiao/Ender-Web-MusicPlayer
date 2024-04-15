<template>
    <div>
        <div class="ender-content">
            <div class="ender-content__searchHead">
                <h1>{{ route.query.keyWords }}</h1>
                <el-skeleton :rows="0" animated :loading="state.isLoading">
                    <template #default>
                        <span>{{ state.totalResult }}个结果</span>
                    </template>
                </el-skeleton>
            </div>
            <div class="ender-content__searchMenu">
                <el-tabs v-model="state.activeName" style="width: 100%;" @tab-click="handleClick">
                    <el-tab-pane label="单曲" name="1">
                        <el-skeleton :rows="5" animated :loading="state.isLoading">
                            <template #default>
                                <MusicTable :tableData="state.dataTable"></MusicTable>
                            </template>
                        </el-skeleton>
                    </el-tab-pane>
                    <el-tab-pane label="歌单" name="1000">
                        <!-- <songList :data="tableData"></songList> -->
                    </el-tab-pane>
                    <el-tab-pane label="MV" name="1004">
                        <el-skeleton :rows="5" animated :loading="state.isLoading">
                            <template #default>
                                <mv :tableData="state.dataTable"></mv>
                            </template>
                        </el-skeleton>
                    </el-tab-pane>
                    <el-tab-pane label="专辑" name="10">
                        <!-- <artists :data="tableData"></artists> -->
                    </el-tab-pane>
                    <el-tab-pane label="歌手" name="100">
                            <!-- <songList :data="tableData"></songList> -->
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>
    </div>
</template>
    
<script setup lang='ts'>
    import { cloudsearch } from "../../api/api"
import { SearchItem, menuItem, Music } from "../../store/type"
import path from 'path';
import { da } from "element-plus/es/locale";
const route = useRoute()
const state = reactive<{
    isLoading: boolean,
    dataTable: any[],
    totalResult: number,
    menuList: menuItem[],
    activeName: string,
    currentPage: number,
}>({
    isLoading: true,
    dataTable: [],
    totalResult: 0,
    menuList: [
        {
            index: 1,
            value: "songs",
            title: "单曲"
        },
        {
            index: 100,
            value: "",
            title: "歌手"
        },
        {
            index: 10,
            value: "",
            title: "专辑"
        },
        {
            index: 1004,
            value: "mvs",
            title: "MV"
        },
        {
            index: 1000,
            value: "",
            title: "歌单"
        },
    ],
    activeName: "1",
    currentPage: 1,
})
const getSearchResult = async (type: string) => {
    state.isLoading = true
    if(!state.dataTable.length){
        cloudsearch({
            keyword: route.query.keyWords as string,
            offset: (state.currentPage - 1) * 30,
            limit: 30,
            type: type
        }).then((res) => {
            console.log(res)
            const result = res.result
            switch(type) {
                case "1":
                    state.dataTable = result.songs.map(item => {
                        const singerNames = item.ar.map(subItem => subItem.name).join(',');
                        return {
                                id: item.id,
                                title: item.name,
                                singer: singerNames,
                                album: item.al.name,
                                cover: item.al.picUrl,
                                src: "",
                                time: item.dt,
                                mv: item.mv,
                                Lyric: ""
                            }
                        }
                    )
                    state.totalResult = result.songCount
                    break;
                case "1004":
                    state.dataTable = result.mvs
                    state.totalResult = result.mvCount
                    break;
            }
            state.isLoading = false
        })
    }
}
const handleClick = (e:any) => {
    console.log(e)
    if(e.props.name){
        state.dataTable = []
        state.isLoading = true
        getSearchResult(e.props.name)
    }
}
// 侦听搜索的关键字
watch(() => route.query.keyWorks, () => {
    if (!route.query.keyWorks){
        return getSearchResult("1")
    }
})
onMounted(() => {
    getSearchResult("1")
})
</script>
    
<style lang="scss" scoped>
@include b(content) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
	// flex-wrap: wrap;
    @include e(searchHead) {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
    }
    @include e(searchMenu) {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: start;
    }
    @include e(searchResult) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>