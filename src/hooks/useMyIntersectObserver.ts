export interface UseMyIntersectObserverOpt {
    // 参考VueUse.useIntersectionObserver
    threshold?: number; // 可见部分阈值
    root?: Element | null; // 测试交叉时用作边界盒的元素
    rootMargin?: string; // 计算交叉时添加到根边界盒 (en-US)的矩形偏移量
    immediate?: boolean;

    // 自定义配置
    pageSize: number;
    initialPageNum: number;
}

type CallBack = (pageNum: number, pageSize: number) => void;

export function useMyIntersectObserver(
    target: Ref<Element | Element[] | undefined>,
    callback: CallBack,
    options: UseMyIntersectObserverOpt = {
        threshold: 0.1,
        root: null,
        rootMargin: "0px",
        pageSize: 10,
        initialPageNum: 1,
    }
) {
    const { root, rootMargin, pageSize, threshold } = options;
    const pageNum = ref(options.initialPageNum);
    const lastFlagMap = new Map<Element, boolean>();

    // 使用MDN IntersectionObserver监听是否出现在页面中
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                const element = entry.target;
                // 如果元素与交叉区域观察者对象 (intersection observer) 的根相交
                if (entry.isIntersecting) {
                    // 处理元素进入动画
                    element.classList.remove("op-0");
                    element.classList.add("come-in");

                    // 检查当前元素是否已为数组最后一个
                    const isLastElement = lastFlagMap.get(element);
                    if (isLastElement) {
                        // 如果是最后一个则调用回调请求新的元素加入
                        callback(pageNum.value, pageSize);
                        // 将页码加一
                        pageNum.value += 1;
                        // 取消元素检查
                        observer.unobserve(element);
                    }
                }
            });
        },
        { threshold, root, rootMargin }
    );

    // 使用watchEffect自动追踪变更以及立即执行回调
    watchEffect(() => {
        observer.disconnect();
        lastFlagMap.clear();
        const targetArray = Array.isArray(target.value)
            ? target.value
            : [target.value];

        const lastIndex = targetArray.length - 1;
        targetArray.forEach((element, index) => {
            if (element) {
                // 添加动画
                element.classList.add("op-0");
                observer.observe(element);
                lastFlagMap.set(element, index === lastIndex);
            }
        });
    });

    onUnmounted(() => {
        observer.disconnect();
        lastFlagMap.clear();
    });

    return { pageNum };
}
