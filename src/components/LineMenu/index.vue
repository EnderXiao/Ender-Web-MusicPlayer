<template>
    <div class="ender-lineMenu" @click="menuItemClick">
        <a :data-index="item.index" :data-route="item.value" class="ender-lineMenu__menuItem" :class="index === activeMenu ? 'ender-lineMenu__menuItem--isActive' : ''" v-for="(item, index) in props.itemList" :key="item.index">{{ item.title }}</a>
        <!-- <a class="ender-lineMenu__item">Music</a>
        <a class="ender-lineMenu__item">Podcast</a>
        <a class="ender-lineMenu__item">MV</a> -->
    </div>
</template>
    
<script setup lang='ts'>
    import { menuItem } from "../../store/type"
    
    const router = useRouter()
    const props = defineProps<{
        itemList: Array<menuItem>,
        defaultActive: number
    }>()
    let activeMenu = ref(0)
    const menuItemClick = (event: MouseEvent) => {
        const element:HTMLLinkElement = event.target as HTMLLinkElement
        activeMenu.value = parseInt(element.dataset.index as string)
        router.push(element.dataset.route as string)
    }
    onBeforeMount(() => {
        activeMenu = ref(props.defaultActive)
    })
    onMounted(() => {
    })
</script>
    
<style lang="scss" scoped>
@include b(lineMenu) {
    display: flex;
    align-items: center;
    @include e(menuItem) {
        text-decoration: none;
        color: var(--theme-color);
        border-bottom: 2px solid transparent;
        padding: 20px 30px;
        transition: 0.3s;
        &:hover {
        border-bottom: 2px solid var(--alert-color);
        color: var(--alert-color);
        }
        @include m(isActive) {
            border-bottom: 2px solid var(--alert-color);
            color: var(--alert-color);
        }
    }
}
</style>