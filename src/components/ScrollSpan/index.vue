<template>
    <span>
        {{ state.text }}
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{
        text?: string | null,
        speed?: number | null,
        direction?: "Vertical" | "Horizon" | null
    }>()

const state = reactive<{
    text: string,
    speed: number,
    direction: "Vertical" | "Horizon"
}>({
    text: props.text || "",
    speed: props.speed || 2,
    direction: props.direction || "Horizon"
})

onMounted(() => {
})
</script>

<style lang="scss" scoped>
</style>