<template>
    <div>
        <canvas ref="canvas" width="1100" height="400"></canvas>
    </div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
const TEXTARR = [
    '一砖一瓦，码出我的国度。',
    'No Pain No Gain.',
    '炫酷不？',
    '给个STAR可以不？',
]
const isPull = ref<boolean>(true)
let canvas = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D;
let board: Board;
let timer:NodeJS.Timeout  = null;
const index = ref<number>(0)
class Board {
    canvasDom: HTMLCanvasElement;
    index: number = -1;
    mouseX: number;
    mouseY: number;
    dotList: Array<Dot> = [];
    power = 0.96;//吸力/斥力
    Radius = 40;//力影响半径
    constructor(canvasDom: HTMLCanvasElement, text: string) {
        this.canvasDom = canvasDom;
        // 监听鼠标移动
        this.canvasDom.addEventListener("mousemove", (e) => {
            const { offsetX, offsetY } = e;
            this.mouseX = offsetX;
            this.mouseY = offsetY;
        });
        this.canvasDom.onmouseleave = () => {
            this.mouseX = 0;
            this.mouseY = 0;
        };
        this.init(text)
        this.animate()
    }
    init(text: string) {
        if (this.dotList.length === 0) {
            this.dotList = new textRransform(this.canvasDom, text).dotList
        } else {
            //已有的粒子替换为新的粒子，让过渡更丝滑
            let newArr = new textRransform(this.canvasDom, text).dotList//新粒子数组
            let newLen = newArr.length//新粒子数组长度
            let oldArr = this.dotList
            let oldLen = oldArr.length
            for (let i = 0; i < newLen; i++) {
                const { totalX, totalY, colorList } = newArr[i];
                if (oldArr[i]) {//如果旧数组有第i个粒子，改变其终点位置
                    oldArr[i].change(totalX, totalY, colorList)
                } else {//新数组的粒子长度比原数组多，就添加粒子
                    oldArr[i] = new Dot(this.canvasDom, totalX, totalY, colorList)
                }
            }
            // 新粒子数组较小 删除多余的粒子
            if (newLen < oldLen) {
                this.dotList = oldArr.splice(0, newLen)
            }

            let len = this.dotList.length//获取处理完后的粒子数组长度
            while (len) {//打乱数组中的粒子顺序
                let randomIdx = ~~(Math.random() * len--);
                let randomPrt = this.dotList[randomIdx];
                let { totalX: tx, totalY: ty, colorList } = randomPrt;

                // 交换目标位置与颜色
                randomPrt.totalX = this.dotList[len].totalX;
                randomPrt.totalY = this.dotList[len].totalY;
                randomPrt.colorList = this.dotList[len].colorList;
                this.dotList[len].totalX = tx;
                this.dotList[len].totalY = ty;
                this.dotList[len].colorList = colorList;
            }
        }

    }
    changeText(text: string) {
        this.init(text)
    }
    animate() {
        if (this.dotList.length > 0) {
            ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
            this.dotList.forEach((v) => {
                v.update(this.mouseX, this.mouseY, this.Radius, this.power);
                v.draw();
            });
        }
        window.requestAnimationFrame(() => this.animate());
    }
}

class textRransform {
    canvasDom: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    dotList: Array<Dot> = [];
    constructor(canvasDom: HTMLCanvasElement, text: string) {

        // 获取图片像素数据
        const canvas = document.createElement('canvas'); // 创建一个空的canvas
        canvas.width = canvasDom.width;
        canvas.height = canvasDom.height;
        this.ctx = canvas.getContext('2d');
        this.ctx.beginPath()
        this.ctx.font = "90px 微软雅黑";
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'center';
        const measureTextInfo = this.ctx.measureText(text)
        this.ctx.fillText(text, canvas.width / 2, canvas.height / 2)
        this.dotList = []
        const imgData = this.ctx.getImageData(canvas.width / 2 - measureTextInfo.width / 2 -8, 0 , measureTextInfo.width, canvas.height);
        for (let y = 0; y < canvas.height; y += 4) {
            for (let x = canvas.width / 2 - measureTextInfo.width / 2 -8; x < canvas.width / 2 + measureTextInfo.width / 2; x += 4) {
                // 像素点的序号 一个像素点有4个值
                const index = (x + y * measureTextInfo.width) * 4;
                // 在数组中对应的值
                const r = imgData!.data[index];
                const g = imgData!.data[index + 1];
                const b = imgData!.data[index + 2];
                const a = imgData!.data[index + 3];
                const sum = r + g + b + a;
                // 筛选条件 4个颜色通道加起来的值越大，像素点越亮
                if (sum >= 100) {
                    const dot = new Dot(canvasDom, x, y, [r, g, b, a]);
                    this.dotList.push(dot);
                }
            }
        }
    }
}

class Dot {
    canvasDom: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number; // 粒子x轴的初始位置
    y: number; // 粒子y轴的初始位置
    totalX: number; // 粒子x轴的目标位置
    totalY: number; // 粒子y轴的目标位置
    colorList: Array<number>;
    mx?: number; // 粒子x轴需要移动的距离
    my?: number; // 粒子y轴需要移动的距离
    vx?: number; // 粒子x轴移动速度
    vy?: number; // 粒子y轴移动速度
    time: number = 40; // 粒子移动耗时
    r: number = 1; // 粒子的半径
    opacity: number = 0; // 粒子的透明度
    constructor(
        canvasDom: HTMLCanvasElement,
        totalX: number,
        totalY: number,
        colorList: Array<number>,
        time?: number,
        r?: number
    ) {
        this.canvasDom = canvasDom;
        this.ctx = canvasDom.getContext('2d');
        // 在canvas画布中随机取一个初始位置
        this.x = (Math.random() * canvasDom.width) >> 0;
        this.y = (Math.random() * canvasDom.height) >> 0;
        this.totalX = totalX;
        this.totalY = totalY;
        this.colorList = colorList;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1, 0, (Math.PI / 180) * 360);
        // this.ctx.arc(this.x, this.y, 1, 0, (Math.PI / 180) * 360);
        this.ctx.fillStyle = `rgba(${this.colorList.toString()})`;
        this.ctx.fill();
    }
    update(mouseX: number, mouseY: number, Radius: number, power: number) {
        // 设置粒子需要移动的距离
        this.mx = this.totalX - this.x;
        this.my = this.totalY - this.y;
        // 设置粒子移动速度
        this.vx = this.mx / this.time;
        this.vy = this.my / this.time;
        if (mouseX && mouseY) {
            //获取鼠标到粒子距离
            let dx = mouseX - this.x;
            let dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy)
            // 计算粒子与X轴之间受力的角度
            const angle = Math.atan2(dy, dx)
            // 计算力影响半径与（鼠标到粒子距离）的比例
            // 比例越大，受到的力越大
            let per = Radius / distance
            // 力有最大值，不能过大
            per = per > 7 ? 7 : per
            // 计算受到的力
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const newVx = cos * power * (isPull.value ? -per : per)
            const newVy = sin * power * (isPull.value ? -per : per)
            this.vx += newVx;
            this.vy += newVy;
        }
        // 更新粒子位置
        this.x += this.vx;
        this.y += this.vy;
        if (this.opacity < 1) this.opacity += 1 / this.time;
    }
    change(totalX: number, totalY: number, colorList: number[]) {
        this.totalX = totalX;
        this.totalY = totalY;
        this.colorList = [...colorList];
    }
}

onMounted(() => {
    ctx = canvas.value.getContext('2d')
    board = new Board(canvas.value, TEXTARR[0]);
    timer = setInterval(() => {
        if (TEXTARR.length - 1 === index.value) {
            index.value = 0
        } else {
            index.value++
        }
        board.changeText(TEXTARR[index.value])
    }, 10000)
    
});

onUnmounted(() => {
    clearInterval(timer)
})

</script>
<style scoped lang='less'></style>
