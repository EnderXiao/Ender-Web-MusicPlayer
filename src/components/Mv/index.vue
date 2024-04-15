<template>
    <div>
        <div class="ender-contentBlock">
            <el-skeleton :rows="5" animated :loading="state.mvLoading">
                <template #default>
                    <div class="ender-cardBlock">
                        <div v-for="(item) in state.mvList" :key="item.id" class="ender-card">
                            <div class="ender-card__mvImg">
                                <img v-img-lazy="item.cover + '?param=370y220'" :src="item.cover + '?param=370y220'" alt="" />
                            </div>
                            <a href="javascript:;">{{ item.name }}</a>
                        </div>
                    </div>
                </template>
            </el-skeleton>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
    import { getMv } from "../../api/api";
import { MvObj } from "../../api/type";
    const router = useRouter()
    const props = withDefaults(defineProps<{
        tableData: MvObj[]
    }>(), {
        tableData: () => []
    })
    const state = reactive<{
        mvLoading: boolean,
        mvList: MvObj[],
    }>({
        mvLoading: true,
        mvList: [],
    })

    onMounted(async () => {
        state.mvLoading = true;
        state.mvList = []
        if(props.tableData.length == 0) {
            console.log("no_props")
            getMv().then(({ data }) => {
                console.log(data)
                state.mvList = data.data
                console.log(state.mvList)
                state.mvLoading = false
            })
        } else {
            state.mvList = []
            console.log("has_props: ",props.tableData )
            state.mvList = props.tableData
            state.mvLoading = false
        }
    })
</script>
    
<style lang="scss" scoped>
@include b(contentBlock) {
    margin-top: 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
@include b(cardBlock) {
	display: flex;
	align-items: center;
    justify-content: center;
	flex-wrap: wrap;
	// margin-left: -13px;
	a {
		display: block;
		width: 230px;
		font-size: 14px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-decoration: none;
		color: var(--theme-color);
		// display: flex;
		// align-items: center;
		font-weight: 400;
		transition: 0.3s;
	}
}

@include b(card) {
    margin: 18px 13px;
    display: flex;
    flex-direction: column;
    align-items: center;

	a {
		margin-top: 10px;
        margin: 0 auto;
		text-align: center;
	}

    @include e(mvImg) {
        width: 230px;
        display: flex;
        flex-direction: column;
	    // width: calc(33.3% - 20px);
        font-size: 16px;
        background-color: var(--content-bg);
        border-radius: 10px;
	    // border: 1px solid var(--theme-bg-color);
        // padding: 5px;
        cursor: pointer;
        // margin: 0px 18px 18px 0px;
        transition: 0.3s ease;
        &:hover {
            transform: scale(1.02);
            background-color: var(--theme-bg-color);
            box-shadow: 0 0 100px 1px rgba(128, 128, 128, 0.705);
        }

        svg {
            width: 28px;
            border-radius: 6px;
            margin-right: 12px;
            flex-shrink: 0;
        }

        img {
            border-radius: 5px;
        }

        span {
            display: flex;
            align-items: center;
        }

        &__subtext {
            font-size: 14px;
            font-weight: 400;
            line-height: 1.6em;
            margin-top: 20px;
	    	// border-bottom: 1px solid var(--border-color);
	    	// padding-bottom: 20px;
        }
	    &__footer {
	    	font-size: 14px;
	    	font-weight: 400;
	    	line-height: 1.6em;
	    	margin-top: 20px;
	    	display: flex;
	    	flex-direction: row;
	    	justify-content: space-between;
	    }
	    &-buttons {
	    	display: flex;
	    	align-items: center;
	    	margin-left: auto;
	    	margin-top: 16px;
	    }

	    @media screen and (max-width: 1110px) {
	    	width: calc(50% - 20px);

	    	&:last-child {
	    		margin-top: 20px;
	    		margin-left: 0px;
	    	}
	    }

	    @media screen and (max-width: 565px) {
	    	width: calc(100% - 20px);
	    	margin-top: 20px;

	    	& + .app-card {
	    		margin-left: 0;
	    	}
	    }
    }
}
</style>