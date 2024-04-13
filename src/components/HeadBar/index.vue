<template>
    <div class="ender-header">
        <LineMenu :itemList="menuList" :defaultActive="menuDefaultAct"></LineMenu>
        <div class="ender-header__searchBar">
            <input type="text" placeholder="Search" @keyup.enter='toSearch' v-model="keyWord">
        </div>
        <div class="ender-header__about">
            <a>github</a>
        </div>
        <div class="ender-header__profile">
            <div class="ender-header__profile__notification">
                <a>
                    <icon-solar-bell-bing-line-duotone></icon-solar-bell-bing-line-duotone>
                </a>
            </div>
            <div class="ender-header__profile__notification">
                <a>
                    <icon-solar-cloud-broken></icon-solar-cloud-broken>
                </a>
            </div>
            <div class="ender-header__profile__userInfo"  v-if="!currentUserStatus">
                <div class="ender-header__profile__userInfo__username"><a>登录</a></div>
                <div class="ender-header__profile__userInfo__Card" v-show="loginPopup"></div>
            </div>
            <div class="ender-header__profile__userInfo" v-else>
                <el-dropdown>
                    <img class="ender-header__profile__userInfo__avatar" :src="globalStore.userInfo.avatar" alt="">
                </el-dropdown>
                <div class="ender-header__profile__userInfo__username">{{ globalStore.userInfo.nickName }}</div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
    const globalStore = GlobalStore()
    const currentUserStatus = computed(() => globalStore.isLogin)
    const router = useRouter()
    
    const keyWord = ref("")
    const loginPopup = ref(false)
    const menuDefaultAct = ref(0)


    const menuList = ref([
        {
            index: 0,
            value: "/",
            title: "Home"
        },
        {
            index: 1,
            value: "/podcast",
            title: "Podcast"
        },
        {
            index: 2,
            value: "/mv",
            title: "MV"
        }
    ])

    const toSearch = () => {
        if(keyWord.value.trim())
            router.push({ path: "/search", query: { keyWords: keyWord.value.trim()} })
        else{
            keyWord.value = "五月天"
            router.push({ path: "/search", query: { keyWords: "五月天"}})
        }
    }

</script>
    
<style lang="scss" scoped>
@include b(header) {
    display: flex;
    align-items: center;
    flex-grow: 0;
    height: 58px;
    border-bottom: 1px solid var(--border-color);
    padding: 0 30px;
    white-space: nowrap;
    @include e(searchBar) {
        height: 40px;
        display: flex;
        width: 100%;
        max-width: 400px;
        padding-left: 16px;
        align-items: center;
        input {
            width: 100%;
            height: 100%;
            border: none;
            background-color: var(--search-bg);
            box-shadow: 0 0 0 2px rgb(134 140 160 / 2%);
            border-radius: 4px;
            font-size: 15px;
            font-weight: 500px;
            padding: 0 20px 0 60px;
            color: var(--theme-color);
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23717790c7'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-size: 15px;
            background-position: 16px 48%;
            &::placeholder {
                color: var(--inactive-color);
                font-size: 15px;
                font-weight: 500;
            }
        }
    }
    @include e(about) {
        margin-left: 4px;
        width: auto;
        a{
            text-decoration: none;
            padding: 0 10px;
            color: var(--theme-color);
        }
    }
    @include e(profile) {
        display: flex;
        align-items: center;
        padding: 0 16px 0 16px;
        margin-left: auto;
        flex-shrink: 0;
        @include e(notification) {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 22px;
            &{
                @media screen and (max-width: 945px) {
                    display: none;
                }
            }
        }
        @include e(userInfo) {
            display: flex;
            justify-content: center;
            align-content: center;
            @include e(avatar) {
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }
            @include e(username) {
                color: var(--theme-color);
                margin: 0px 30px 0 15px;
                display: flex;
                align-items: center;
                font-size: 14px;
                // 溢出表现为省略号
                max-width: 100px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>