<template>
    <div class="parctise-box">
        <canvas ref="canvas" width="1100" height="400"></canvas>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, } from 'vue';

// 获取canvas画布
const canvas = ref<HTMLCanvasElement>(null);
let ctx: CanvasRenderingContext2D;
let board = ref<Board>()
let mouseDot = ref<Dot>()

class Board {
    dotList:Array<Dot> = [];
    dotNum:number = 80;
    constructor(){
        this.init()
        
    }
    init(){
        for(let i = 0; i < this.dotNum; i ++){
            this.dotList.push(new Dot(ctx)) 
        }
        mouseDot.value = new Dot(ctx,0,0,0,0)
        canvas.value.addEventListener('mousemove',(e)=>{
            const { offsetX, offsetY } = e
            mouseDot.value.change(offsetX,offsetY)
        })
    }
    animate(){
        ctx.clearRect(0,0,canvas.value.width,canvas.value.height)
        this.dotList.forEach(v =>{
            v.update()
            v.draw()
        })
        if(mouseDot.value){
            mouseDot.value.draw()
        }
        window.requestAnimationFrame(() => this.animate())
    }
}
class Dot {
    x:number;
    y:number;
    vx:number;
    vy:number;
    r:number = 3;
    maxLine:number = 50;
    ctx:CanvasRenderingContext2D;
    constructor(ctx:CanvasRenderingContext2D,x?:number,y?:number,vx?:number,vy?:number){
        this.x = x || (Math.random() * canvas.value.width) >> 0;
        this.y = y || (Math.random() * canvas.value.height) >> 0;
        this.vx = vx || 2 * Math.random() - 1;
        this.vy = vy || 2 * Math.random() - 1;
        this.ctx = ctx
    }
    draw(){
        this.ctx.beginPath()
        this.ctx.fillRect(this.x,this.y,this.r,this.r)
        this.ctx.fillStyle = 'black'
        this.ctx.fill()
        
        board.value.dotList.forEach(v=>{
            if(v !== this && Math.sqrt(((v.x - this.x)*(v.x - this.x) +(v.y - this.y)*(v.y - this.y)))<this.maxLine){
                const distance = Math.sqrt(((v.x - this.x)*(v.x - this.x) +(v.y - this.y)*(v.y - this.y)))
                const w = (this.maxLine - distance) / this.maxLine
                this.ctx.beginPath()
                this.ctx.lineWidth = w
                this.ctx.moveTo(this.x + this.r/2,this.y + this.r/2)
                this.ctx.lineTo(v.x + this.r/2,v.y + this.r/2)
                ctx.strokeStyle = `rgba(110,110,110,${w })`;
                this.ctx.stroke()
            }
        })
        
    }
    update(){
        if(this.x + this.vx >= canvas.value.width || this.x<=0){
            this.vx = -this.vx
        }
        if(this.y + this.vy > canvas.value.height || this.y<0){
            this.vy = -this.vy
        }
        this.x += this.vx
        this.y += this.vy
    }
    change(x:number,y:number){
        this.x = x
        this.y = y
    }
}

onMounted(() => {
    ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D;
    board.value = new Board()
    board.value.animate()
});

</script>
<style scoped lang="less">
.parctise-box {
    height: 100%;
}

canvas{
    background-color: #fff;
}
</style>
  