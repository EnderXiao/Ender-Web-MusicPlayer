<template>
    <div
        class="bg-white transition bg-opacity-40 hover:bg-[#D9DEE3] hover:bg-opacity-50 p-5 rounded-lg shadow-lg flex flex-col justify-between"
    > 
        <div class="flex item-center gap-3">
            <el-avatar
                :src="props.user.avatarUrl"
                :alt="props.user.nickname"
                class="w-10 h-10 rounded-full"
            ></el-avatar>
            <div class="user-info flex flex-col">
                <h3 class="username font-bold text-gray-50 text-sm">{{ props.user.nickname }}</h3>
                <p class="text-gray-50 text-xs">{{ props.timeStr }}</p>
            </div>
        </div>
        <p class="comment-text text-gray-200 text-xs py-3">
            {{ props.content }}
        </p>
        <div class="like flex items-center justify-between">
            <div class="flex items-center">
                <icon-solar-chat-round-like-broken class="text-red-400" />
                <span class="text-gray-200 text-xs">{{ props.likedCount }}</span>
            </div>
            {{ props.ipLocation.location }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { CommentObj } from '../../../api/type';

const props = defineProps<CommentObj>()
</script>

<style lang="scss" scoped>
</style>