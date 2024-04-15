<template>
    <div>
        <div class="ender-banner">
            <div class="ender-banner-context">
                <div class="ender-banner-img-content"></div>
            </div>
        </div>
        <el-skeleton :rows="5" animated :loading="loading" style="width: 100%">
            <template #default>
                <div class="ender-contentBlock">
                    <MusicTable :table-data="tableDate"></MusicTable>
                </div>
                <div class="ender-content">
                    <el-skeleton :rows="5" animated :loading="loading" />
                    <div class="ender-content__item" v-for="(item, index) in playlists" :key="index">
                        <div class="ender-content__item__card">
                            <img :src="item.coverImgUrl + '?param=200y200'" alt="" />
                        </div>
                        <a href="javascript:;">{{ item.name }}</a>
                    </div>
                </div>
            </template>
        </el-skeleton>
    </div>
</template>
    
<script setup lang='ts'>
    import { getRecommendNewSong } from '@/api/api';
    const router = useRoute();
    const state = reactive({
        searchKw: "",
        tableDate: [],
        playlists: [],
        loading: true
    });
    const { tableDate, playlists, loading } = toRefs(state)

    onMounted(async () => {
        state.loading = true;
        // TODO: 获取推荐新歌
        getRecommendNewSong().then((res) => {
            console.log(res)
            state.tableDate = res.result.map((item:any) => {
                const names = item.song.artists.map((subItem:any) => subItem.name).join(",");
                return {
                    cover: item.picUrl,
                    title: item.name,
                    singer: names,
                    album: item.song.album.name,
                    time: item.song.duration,
                    id: item.id,
                    mv: item.song.mvid
                }
            })
            state.loading = false;
        })
    });
</script>
    
<style lang="scss" scoped>
@include b(content) {
    margin-top: 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    @include e(item) {
        margin: 0px 0px 18px 13px
        a {
            margin-top: 10px;
        }
        @include e(card) {
            width: 230px;
            display: flex;
            flex-direction: column;
            // width: calc(33.3% - 20px);
            font-size: 16px;
            background-color: var(--content-bg);
            border-radius: 10px;
            // border: 1px solid var(--theme-bg-color);
            padding: 5px;
            cursor: pointer;
            transition: 0.3s ease;

            // margin: 0px 18px 18px 0px;
            &:hover {
                transform: scale(1.02);
                background-color: var(--theme-bg-color);
            }

            svg {
                width: 28px;
                border-radius: 6px;
                margin-right: 12px;
                flex-shrink: 0;
            }

            img {
                border-radius: 5px;
            }

            span {
                display: flex;
                align-items: center;
            }

            &__subtext {
                font-size: 14px;
                font-weight: 400;
                line-height: 1.6em;
                margin-top: 20px;
                // border-bottom: 1px solid var(--border-color);
                // padding-bottom: 20px;
            }
            &__footer {
                font-size: 14px;
                font-weight: 400;
                line-height: 1.6em;
                margin-top: 20px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            &-buttons {
                display: flex;
                align-items: center;
                margin-left: auto;
                margin-top: 16px;
            }

            @media screen and (max-width: 1110px) {
                width: calc(50% - 20px);

                &:last-child {
                    margin-top: 20px;
                    margin-left: 0px;
                }
            }

            @media screen and (max-width: 565px) {
                width: calc(100% - 20px);
                margin-top: 20px;

                & + .app-card {
                    margin-left: 0;
                }
            }
        }
    }
}
</style>