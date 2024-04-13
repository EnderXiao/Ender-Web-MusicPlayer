<template>
    <div class="ender-menu">
        <div class="ender-menu__head">
            <div class="ender-menu__head__logo">
                <SvgIcons prefix="#icon" name="ender" color="#8076a3" width="40px" height="40px"></SvgIcons>
            </div>
            <div class="ender-menu__head__name">
                <div class="ender-menu__head__name--mainName">Ender</div>
                <div class="ender-menu__head__name--subName">Music Player</div>
            </div>
        </div>
        <el-scrollbar class="ender-menu__body">

            <div class="ender-menu__body__wrapper">
                <div class="ender-menu__body__title">
                    发现
                </div>
                <div class="ender-menu__body__item">
                    <router-link to="/">
                    <icon-solar-music-notes-broken></icon-solar-music-notes-broken>
                        乐库
                    </router-link>
                    <router-link to="/">
                    <icon-solar-radio-minimalistic-broken></icon-solar-radio-minimalistic-broken>
                        电台
                    </router-link>
                    <router-link to="/">
                    <icon-solar-music-library-broken></icon-solar-music-library-broken>
                        歌单
                    </router-link>
                    <router-link to="/">
                    <icon-solar-cat-broken></icon-solar-cat-broken>
                        动漫
                    </router-link>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
    
<script setup lang='ts'>
    import "@/assets/ender.svg"
</script>
    
<style lang="scss" scoped>
@include b(menu) {
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    padding: 10px 5px;
    width: 100%;
    flex-basis: 240px;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid var(--border-color);
    @media screen and (max-width: 945px) {
        display: none;
    }
    @include e(head) {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        padding: 5px;
        @include e(logo) {
            width: 100%;
            height: 100%;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: right;
            padding: 0 5px;
        }
        @include e(name) {
            width: auto;
            flex: 2;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: left;
            justify-content: center;
            padding: 0 5px;
            @include m(mainName) {
                font-size: 20px;
                font-weight: bold;
                color: var(--theme-color);
            }
            @include m(subName) {
                font-size: 16px;
                color: var(--theme-color);
            }
        }
    }
    @include e(body) {
        overflow-y: auto;
        padding: 26px 10px 26px 26px;
        flex: 1;
        @include e(wrapper) {
            margin-top: 20px;
        }
        @include e(title) {
            margin-bottom: 14px;
            display: flex;
            font-size: 20px;
            color: var(--theme-color);
        }
        @include e(item) {
            display: flex;
            flex-direction: column;
            white-space: nowrap;
            a {
                text-decoration: none;
                color: var(--theme-color);
                display: flex;
                align-items: center;
                font-weight: 400;
                padding: 10px;
                font-size: 18px;
                border-radius: 6px;
                transition: 0.3s;
                &:hover {
                    background-color: var(--theme-bg-color);
                    color: var(--theme-color);
                    box-shadow: 10px, 10px, 10px, 10px, var(--theme-color);
                }
            }        
            .side-menu-cover {
                border-radius: 5px;
            }
            .side-menu-title {
                display: flex;
                flex-direction: column;
            }
            svg {
                width: 16px;
                margin-right: 8px;
            }
            img {
                width: 28px;
                margin-right: 8px;
            }
        }
    }
}
</style>