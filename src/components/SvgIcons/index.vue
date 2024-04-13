<template>
    <div>
        <svg :style="{ width: width, height: height }">
            <use :xlink:href="`${prefix}-${name}`" :fill="color" />
        </svg>

    </div>
</template>
    
<script setup lang='ts'>
    import { ref } from 'vue';
    withDefaults(defineProps<{
        prefix: string,
        name: string,
        color: string,
        width: string,
        height: string
    }>(), {
        prefix: '#icon',
        color: '',
        width: '16px',
        height: '16px'
    })
</script>
    
<style>
    
</style>