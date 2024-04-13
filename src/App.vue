<script setup lang="ts">
import mainPage from "@/layouts/index.vue"
</script>

<template>
    <div class="mainContainer">
        <div class="video-bg">
            <video width="320" height="240" autoplay loop muted>
                <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <mainPage></mainPage>
    </div>
</template>

<style lang="scss" scoped>
.mainContainer {
    width: 100%;
    height: 100%;
    .video-bg {
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
}
</style>
