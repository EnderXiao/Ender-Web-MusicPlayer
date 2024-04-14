<template>
    <div class="p-3">
        <h3 class="py-2">热门评论</h3>
        <br/>
        <div
            v-for="item in commentList.hotComments"
            :key="item.commentId"
            class="comment-card flex items-center"
        >
            <div class="flex flex-col items-center">
                <el-avatar></el-avatar>
                <div class="user-info flex">
                    <h3 class="username font-bold text-sm"></h3>
                    <p class="text-gray-700 text-xs"></p>
                </div>
            </div>
            <div class="comment-text text-gray-800 text-xs py-3">

            </div>
            <div class="like flex items-center justify-between">
                <icon-solar-chat-round-like-broken class="text-red-400" />
                <span class="text-gray-800 text-xs"></span>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { getComments } from '../../api/api';


let commentList = reactive<any>({})
const props = defineProps<{
    id: string
}>()

onMounted(() => {
    commentList = getComments({
        type: "music",
        id: props.id,
    }).then((res) => {
        console.log("getComment:", res)
    })
})
</script>

<style lang="scss" scoped>
</style>