<template>
    <div class="ender-app ender-horizonWrapper">
        <side-menu></side-menu>
        <div class="ender-verticalWrapper" style="height: 100%;">
            <head-bar></head-bar>
            <div class="ender-verticalWrapper ender-mainContainer">
                <router-view v-slot="{ Component }">
                    <transition>
                        <div id="main-container" class="ender-verticalWrapper">
                            <keep-alive>
                                <component :is="Component" />
                            </keep-alive>
                        </div>
                    </transition>
                </router-view>
            </div>
            <music-player></music-player>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
    
</script>
    
<style lang="scss" scoped>
@include b(app) {
	background-color: var(--theme-bg-color);
	// max-height: 100%;
    height: 100%;
    width: 100%;
	overflow: hidden;
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	font-size: 15px;
	font-weight: 500;
	box-shadow: 0 5px 16px rgb(0 0 0 / 10%);
}
@include b(horizonWrapper) {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
}
@include b(verticalWrapper) {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
@include b(mainContainer) {
    overflow: auto;
    height: 90%;
    flex-grow: 0;
}
#main-container {
    color: var(--theme-color);
    padding: 35px 20px 20px 20px;
	height: 100%;
	overflow: auto;
	background-color: var(--theme-bg-color);
}
</style>