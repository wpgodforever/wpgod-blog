<template>
    <div class="flex-col box">
        <canvas ref="canvas" width="1100" height="600"></canvas>
        <div><el-button class="canvas-button" size="small" id="file-shot" type="primary">截图</el-button></div>
    </div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue'
class Rect {
    width;  // 截图框的宽度
    height; // 截图框的高度
    x;  // x坐标
    y;  // y坐标
    points = [];  // 点的位置
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    draw(img) {
        // 绘制图片
        ctx.drawImage(img, 0, 0, width.value, height.value)
        // 绘制蒙层
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(0, 0, width.value, height.value)
        
        // 绘制截图区域
        const { width: imgWidth, height: imgHeight } = img
        ctx.clearRect(this.x, this.y, this.width, this.height)
        xPercent.value = this.x / width.value
        yPercent.value = this.y / height.value
        widthPercent.value = this.width / width.value
        heightPercent.value = this.height / height.value
        
        ctx.drawImage(img, xPercent.value * imgWidth, yPercent.value * imgHeight, widthPercent.value * imgWidth, heightPercent.value * imgHeight, this.x, this.y, this.width, this.height)
        // 绘制拖拽点
        this.points = [this.x + this.width, this.y + this.height]
        const [px, py] = this.points
        ctx.fillStyle = '#fff'
        ctx.fillRect(px - 3, py - 3, 6, 6)
    }
}
const canvas = ref<HTMLCanvasElement>(null)
let ctx: CanvasRenderingContext2D;
// 截图按钮
let btn = ref(null)
// canvas画布宽高
const width = ref(0)
const height = ref(0)
// 实例化截图框类
const mask = new Rect(0, 0, 200, 200)
const img = new Image()
// 鼠标在canvas画布中是否按下
let isDown = ref(false)
// 截图框位置
let maskInfo = reactive({
    preMask : []
})
const xPercent = ref(0)
const yPercent = ref(0)
const widthPercent = ref(0)
const heightPercent = ref(0)
onMounted(() => {
    ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D;
    btn = document.getElementById('file-shot')
    width.value = canvas.value.width
    height.value = canvas.value.height
    img.src = 'https://wpbucket124.oss-cn-guangzhou.aliyuncs.com/public/assets/headImg.jpg' + '?time=' + new Date().valueOf();
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
        mask.draw(img)
    }
    canvas.value.addEventListener('mousemove', e => {
        const { offsetX, offsetY } = e
        let moveX = offsetX - maskInfo.preMask[0]
        let moveY = offsetY - maskInfo.preMask[1]
        // console.log(maskInfo.preMask[0],'--------------')
        // 移动的逻辑
        if (offsetX >= mask.x && offsetX <= (mask.x + mask.width - 10) &&
            offsetY >= mask.y && offsetY <= (mask.y + mask.height - 10)) {
            canvas.value.style.cursor = 'move'
            if (isDown.value) {
                // 判断mask移动的趋向
                if (mask.x + moveX <= (width.value - mask.width) && moveX > 0) mask.x += moveX
                if (mask.y + moveY <= (height.value - mask.height) && moveY > 0) mask.y += moveY
                if (mask.x + moveX >= 0 && moveX < 0) mask.x += moveX
                if (mask.y + moveY >= 0 && moveY < 0) mask.y += moveY
                mask.draw(img)
                maskInfo.preMask = [offsetX, offsetY]
            }
        }
        
        // 拖拽的逻辑
        else if (offsetX >= (mask.x + mask.width - 10) && offsetX <= (mask.x + mask.width + 10) &&
            offsetY >= (mask.y + mask.height - 10) && offsetY <= (mask.y + mask.height + 10)) {
            canvas.value.style.cursor = 'nwse-resize'
            if (isDown.value) {
                // 判断mask伸缩的趋向
                if (mask.x < (width.value - mask.width) && moveX > 0) mask.width += moveX
                if (mask.y < (height.value - mask.height) && moveY > 0) mask.height += moveY
                if (mask.width + moveX >= 20 && moveX < 0) mask.width += moveX
                if (mask.height + moveY >= 20 && moveY < 0) mask.height += moveY
                mask.draw(img)
                maskInfo.preMask = [offsetX, offsetY]
            }
        } else {
            canvas.value.style.cursor = 'default'
        }
    })
    canvas.value.addEventListener('mousedown', e => {
        const { offsetX, offsetY } = e
        isDown.value = true
        console.log([offsetX, offsetY])
        maskInfo.preMask = [offsetX, offsetY]
    })
    canvas.value.addEventListener('mouseup', e => {
        isDown.value = false
    })
    canvas.value.addEventListener('mouseleave', e => {
        isDown.value = false
    })
    btn.addEventListener('click', () => {
        // 将截图框中的内容渲染到新的canvas中用于下载
        const tmp_canvas = document.createElement('canvas')
        const tmp_ctx = tmp_canvas.getContext('2d')
        tmp_canvas.width = mask.width
        tmp_canvas.height = mask.height
        const img_source = canvas.value
        console.log(width.value*xPercent.value, height.value*yPercent.value, width.value*xPercent.value, height.value*yPercent.value)
        tmp_ctx.drawImage(img_source, mask.x, mask.y, mask.width, mask.height, 0, 0, tmp_canvas.width, tmp_canvas.height)

        // 将canvas转换成base64的url
        let url = tmp_canvas.toDataURL("image/png");
        // 把Canvas 转化为图片
        // img.src = url;
        // 将base64转换为文件对象
        let arr = url.split(",")
        let mime = arr[0].match(/:(.*?);/)[1] // 此处得到的为文件类型
        let bstr = atob(arr[1]) // 此处将base64解码
        let n = bstr.length
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        // 通过以下方式将以上变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
        let file = new File([u8arr], "filename", { type: mime });
        // 将文件对象通过a标签下载
        let aDom = document.createElement("a"); // 创建一个 a 标签
        aDom.download = file.name; // 设置文件名
        let href = URL.createObjectURL(file); // 将file对象转成 UTF-16 字符串
        aDom.href = href; // 放入href
        document.body.appendChild(aDom); // 将a标签插入 body
        aDom.click(); // 触发 a 标签的点击
        document.body.removeChild(aDom); // 移除刚才插入的 a 标签
        URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16 字符串
    })
});






</script>
<style scoped lang='less'>
.box {
    align-items: center;
}
.canvas-button {
  position: relative;
  margin: 10px;
  border: none;
  width: 5rem;
  height: 2rem;
  background-color: rgb(255, 157, 28);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #000;
  &:hover {
    background-color: rgb(255, 180, 83);
    transition: .3s all;
  }
}
#file-input {
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  opacity: 0;
}
</style>
