<template>
    <div v-if="commentList.comments && commentList.comments.length > 0" class="p-3">
        <h3 class="py-2">热门评论</h3>
        <br/>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div
                v-for="item in commentList.hotComments"
                :key="item.commentId"
                ref="observedElement"
                class="bg-white transition bg-opacity-40 hover:bg-[#D9DEE3] hover:bg-opacity-50 p-5 rounded-lg shadow-lg flex flex-col justify-between"
            > 
                <div class="flex item-center gap-3">
                    <el-avatar
                        :src="item.user.avatarUrl"
                        :alt="item.user.nickname"
                        class="w-10 h-10 rounded-full"
                    ></el-avatar>
                    <div class="user-info flex flex-col">
                        <h3 class="username font-bold text-gray-50 text-sm">{{ item.user.nickname }}</h3>
                        <p class="text-gray-50 text-xs">{{ item.timeStr }}</p>
                    </div>
                </div>
                <p class="comment-text text-gray-200 text-xs py-3">
                    {{ item.content }}
                </p>
                <div class="like flex items-center gap-2 justify-between">
                    <div class="flex items-center gap-1">
                        <icon-solar-chat-round-like-bold class="text-red-400" />
                        <span class="text-gray-200 text-xs">{{ item.likedCount }}</span>
                    </div>
                    {{ item.ipLocation.location }}
                </div>
            </div>
        </div>

        <h3 class="py-2">最新评论</h3>
        <br/>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div
                v-for="item in commentList.comments"
                :key="item.commentId"
                ref="observedElement"
                class="bg-white transition bg-opacity-40 hover:bg-[#D9DEE3] hover:bg-opacity-50 p-5 rounded-lg shadow-lg flex flex-col justify-between"
            > 
                <div class="flex item-center gap-3">
                    <el-avatar
                        :src="item.user.avatarUrl"
                        :alt="item.user.nickname"
                        class="w-10 h-10 rounded-full"
                    ></el-avatar>
                    <div class="user-info flex flex-col">
                        <h3 class="username font-bold text-gray-50 text-sm">{{ item.user.nickname }}</h3>
                        <p class="text-gray-50 text-xs">{{ item.timeStr }}</p>
                    </div>
                </div>
                <p class="comment-text text-gray-200 text-xs py-3">
                    {{ item.content }}
                </p>
                <div class="like flex items-center gap-2 justify-between">
                    <div class="flex items-center gap-1">
                        <icon-solar-chat-round-like-bold class="text-red-400" />
                        <span class="text-gray-200 text-xs">{{ item.likedCount }}</span>
                    </div>
                    {{ item.ipLocation.location }}
                </div>
            </div>
        </div>
        
    </div>
    
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { getComments } from '../../api/api';
import { CommentObj, CommentsAry } from '../../api/type';
import { useMyIntersectObserver } from '../../hooks/useMyIntersectObserver';

const observedElement = ref([])

let commentList = ref<CommentsAry>({
    comments: [],
    hotComments: [],
    total: 0
})
const props = defineProps<{
    id: string
}>()

const handleIntersect = (offset: number) => {
    getComments({
        type: "music",
        id: props.id,
        offset: offset,
    }).then((res) => {
        commentList.value.comments.push(...res.comments)
    })
}

useMyIntersectObserver(observedElement, handleIntersect, {
    initialPageNum: 2,
    pageSize: 10,
    threshold: 0.1
})

watch(
    () => props.id,
    () => {
        getComments({
            type: "music",
            id: props.id,
        }).then((res) => {
            commentList.value = res
            console.log("getComment: ", commentList.value.comments)
        })
    },
    {immediate: true}
)

onMounted(() => {
    console.log("observed: ", observedElement)
})


</script>

<style lang="scss" scoped>
</style>