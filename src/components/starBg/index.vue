<template>
    <div class="star-container">
        <div class="star" ref="starsRef"></div>
        <div class="meteor" ref="metreorRef" v-for="(item, index) in meteors" :key="index"></div>
    </div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
// 静态星星-----------------------------------------
const starts = 633; // 页面中全体星星个数
const starsRef = ref<HTMLDivElement | null>(null)
const timer = ref()
onMounted(() => {
    if (starsRef.value) {
        let shadow = ""
        for (let i = 0; i < starts; i++) {
            let x = Math.floor(Math.random() * 1920);
            let y = Math.floor(Math.random() * 1080);
            shadow = `${x}px ${y}px #fff, ${shadow}`
        }
        shadow = shadow.substring(0, shadow.length - 2)
        starsRef.value.style.boxShadow = shadow
        start()
        // 每10S从新设置休息下落
        timer.value = setInterval(start, 10000);
    }
})
onUnmounted(() => {
    clearInterval(timer.value)
    timer.value = ''
})
// 流星------------------------------------------
const meteors = 30;  // 流星个数
const metreorRef = ref<HTMLDivElement[]>([])
const start = () => {
  metreorRef.value.forEach((item: HTMLDivElement) => {
    let v = Math.floor(Math.random() * 100);
    let h = Math.floor(Math.random() * 1950 - 500);
    // 每个流星随机下落的持续时间
    // 流星的下落时间必须能被10整除，要不然动画没有执行完就重新加载，会很突兀
    let time = Math.floor(Math.random() * 5 + 1);
    time = 10%time === 0?time:5;
    // 流星位置
    item.style.top = `${h}px`;
    item.style.left = `${v}%`;
    item.style.animation = `meteorAnim ${time}s linear infinite`
  })
}
</script>
<style scoped lang='less'>
.star-container {
    flex: 1;
    position: fixed;
    top: 0;
    width: calc(100%);
    height: 100%;
    // left: -10px;
    /* 在容器中心的渐变，从红色开始，变成蓝色，最后变成绿色 */
    background-image: radial-gradient(ellipse at top, #050b12 0%, #181b25 100%);
    z-index: -1;
    overflow: hidden;
    .star {
        width: 1px;
        height: 1px;
        background: transparent;
    }
}
</style>
<style>
/* 尾巴 */
.meteor {
    position: absolute;
    width: 300px;
    height: 1px;
    top: 50%;
    background-image: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
    animation: meteorAnim 10s linear infinite;
}

/* 星星亮点 */
.meteor::before {
    content: "";
    position: absolute;
    width: 4px;
    height: 5px;
    border-radius: 50%;
    margin-top: -2px;
    background: rgba(#fff, .7);
    box-shadow: 0 0 15px 3px #fff;
}

@keyframes meteorAnim {
    0% {
        opacity: 0;
        transform:  rotate(-45deg);
    }

    50% {
        transform: translate(-100%,500px) rotate(-45deg);
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform: translate(-200%,1000px) rotate(-45deg);
    }
}
</style>
