export const ScreenShot = class ScreenShot {
    width; // 截图框的宽度
    height; // 截图框的高度
    x; // x坐标
    y; // y坐标
    points = []; // 点的位置
    canvasDom; //canvas dom
    canvasHeight; //canvas dom高度
    canvaswidth; //canvas dom宽度
    ctx; //canvas上下文
    isDown; // 鼠标在canvas画布中是否按下
    preMask; // 截图框位置
    xPercent;
    yPercent;
    widthPercent;
    heightPercent;
    img; //传入的图片
    constructor(canvasDom: HTMLCanvasElement, img, x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.canvasDom = canvasDom;
      this.img = img
      this.init(canvasDom,img);
    }
    draw(img) {
      // 绘制图片
      this.ctx.drawImage(img, 0, 0, this.canvaswidth, this.canvasHeight);
      // 绘制蒙层
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, 0, this.canvaswidth, this.canvasHeight);
  
      // 绘制截图区域
      const { width: imgWidth, height: imgHeight } = img;
      this.ctx.clearRect(this.x, this.y, this.width, this.height);
      this.xPercent = this.x / this.canvaswidth;
      this.yPercent = this.y / this.canvasHeight;
      this.widthPercent = this.width / this.canvaswidth;
      this.heightPercent = this.height / this.canvasHeight;
      this.ctx.drawImage(img, this.xPercent * imgWidth, this.yPercent * imgHeight, this.widthPercent * imgWidth, this.heightPercent * imgHeight, this.x, this.y, this.width, this.height)
      // 绘制拖拽点
      this.points = [this.x + this.width, this.y + this.height];
      const [px, py] = this.points;
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(px - 3, py - 3, 6, 6);
    }
    //   初始化
    init(canvasDom,img) {
      this.canvaswidth = canvasDom.width;
      this.canvasHeight = canvasDom.height;
      this.ctx = canvasDom.getContext('2d') as CanvasRenderingContext2D;
      this.draw(img);
      canvasDom.addEventListener('mousemove',(e) =>{
          this.maskMove(e)
      })
      canvasDom.addEventListener('mousedown',(e) =>{
          this.clickDown(e)
      })
      canvasDom.addEventListener('mouseup',(e) =>{
          this.clickUp()
      })
      canvasDom.addEventListener('mouseleave',(e) =>{
          this.mouseleave()
      })
      this.isDown = false
      this.preMask = []
    }
    //   截图
    save() {
      // 将截图框中的内容渲染到新的canvas中用于下载
      const tmp_canvas = document.createElement('canvas');
      const tmp_ctx = tmp_canvas.getContext('2d');
      tmp_canvas.width = this.width;
      tmp_canvas.height = this.height;
      const img_source = this.canvasDom;
      tmp_ctx.drawImage(
        img_source,
        this.x,
        this.y,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      );
      // 将canvas转换成base64的url
      let url = tmp_canvas.toDataURL('image/png');
      // 把Canvas 转化为图片
      // img.src = url;
      // 将base64转换为文件对象
      let arr = url.split(',');
      let mime = arr[0].match(/:(.*?);/)[1]; // 此处得到的为文件类型
      let bstr = atob(arr[1]); // 此处将base64解码
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      // 通过以下方式将以上变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
      let file = new File([u8arr], 'filename', { type: mime });
      // 将文件对象通过a标签下载
      let aDom = document.createElement('a'); // 创建一个 a 标签
      aDom.download = file.name; // 设置文件名
      let href = URL.createObjectURL(file); // 将file对象转成 UTF-16 字符串
      aDom.href = href; // 放入href
      document.body.appendChild(aDom); // 将a标签插入 body
      aDom.click(); // 触发 a 标签的点击
      document.body.removeChild(aDom); // 移除刚才插入的 a 标签
      URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16 字符串
    }
    maskMove(e){
      const { offsetX, offsetY } = e
      
        let moveX = offsetX - this.preMask[0]
        let moveY = offsetY - this.preMask[1]
        // 移动的逻辑
        if (offsetX >= this.x && offsetX <= (this.x + this.width - 10) &&
            offsetY >= this.y && offsetY <= (this.y + this.height - 10)) {
            this.canvasDom.style.cursor = 'move'
            if (this.isDown) {
                // 判断mask移动的趋向
                if (this.x + moveX <= (this.canvaswidth - this.width) && moveX > 0) this.x += moveX
                if (this.y + moveY <= (this.canvasHeight - this.height) && moveY > 0) this.y += moveY
                if (this.x + moveX >= 0 && moveX < 0) this.x += moveX
                if (this.y + moveY >= 0 && moveY < 0) this.y += moveY
              //   this.x = offsetX
              //   this.y = offsetY
                this.draw(this.img)
                this.preMask = [offsetX, offsetY]
                
            }
        }
  
        // 拖拽的逻辑
        else if (offsetX >= (this.x + this.width - 10) && offsetX <= (this.x + this.width + 10) &&
            offsetY >= (this.y + this.height - 10) && offsetY <= (this.y + this.height + 10)) {
            this.canvasDom.style.cursor = 'nwse-resize'
            if (this.isDown) {
                // 判断mask伸缩的趋向
                if (this.x < (this.canvaswidth - this.width) && moveX > 0) this.width += moveX
                if (this.y < (this.canvasHeight - this.height) && moveY > 0) this.height += moveY
                if (this.width + moveX >= 20 && moveX < 0) this.width += moveX
                if (this.height + moveY >= 20 && moveY < 0) this.height += moveY
                this.draw(this.img)
                this.preMask = [offsetX, offsetY]
            }
        } else {
            this.canvasDom.style.cursor = 'default'
        }
    }
    clickDown(e){
          const { offsetX, offsetY } = e
        this.isDown = true
        this.preMask = [offsetX, offsetY]
    }
    clickUp(){
        this.isDown = false
    }
    mouseleave(){
      this.isDown = false
    }
  }