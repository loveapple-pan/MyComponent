<template>
    <div class="container">
        <div class="sliderBody">
            <div class="slider_mask"></div>
            <span>请按住滑块，拖动到最右边</span>
            <span class="slider" v-move><i class="el-icon-d-arrow-right"></i></span>
        </div>
    </div>
</template>


<script>
// 滑块组件
export default {
  directives: {
    move: {
      inserted(el, bingding, vnode) {
        el.dom = {
          //对需要操作的属性进行设置
          start: false,
          diffX: 0,
          sliderBodyWidth: 0,
          maskDom: document.querySelector(".slider_mask"),
          sliderText: document.querySelector(".slider_mask+span"),
          sliderBody: document.querySelector(".sliderBody")
        };
        function startMove(e) {
          //当按住滑块时
          el.dom.start = true;
          el.dom.diffX = e.clientX - el.offsetLeft;
          //获得外层主题的宽度style
          let style = window.getComputedStyle
            ? window.getComputedStyle(el.dom.sliderBody, null)
            : null || el.dom.sliderBody.currentStyle;
          el.dom.sliderBodyWidth = parseFloat(style.width) - 30; //外层滑块主体的最大宽度
        }
        function moving(e) {
          //如果滑块当前是被按住的则表示可以拖拽
          if (el.dom.start) {
            let moveLft = e.clientX - el.dom.diffX;
            let maxComplete = el.dom.sliderBodyWidth * 0.99;
            if (moveLft < 0) {
              moveLft = -1;
            } else if (moveLft > maxComplete) {
              //完成拖拽
              moveLft = el.dom.sliderBodyWidth;
              el.dom.sliderText.innerHTML = "完成验证";
              el.dom.sliderText.style.color = "#5cce9a";
              el.classList.add("slider_success");
              el.querySelector("i").classList.add("el-icon-circle-check");
              //完成拖拽后 解除绑定
              el.removeEventListener("mousedown", startMove);
              document.removeEventListener("mousemove", el._habdleMove);
              document.removeEventListener("mouseup", el._handleStop);
            }
            //移动完之后进行css赋值
            el.style.left = moveLft + "px";
            el.dom.maskDom.style.width = moveLft + "px";
          }
        }
        function stopMove(e) {
          // 停止拖拽要将start赋值为false
          el.dom.start = false;
          let currentX = e.clientX - el.dom.diffX;
          // 与当前位置进行判断是否拖住到底部  否则置为初始位置
          if (currentX < el.dom.sliderBodyWidth) {
            el.style.left = -1 + "px";
            el.dom.maskDom.style.width = 0 + "px";
          }
        }
        //将函数位置为el属性 方便解绑操作
        el._habdleMove = moving;
        el._handleStop = stopMove;
        el.addEventListener("mousedown", startMove);
        document.addEventListener("mousemove", el._habdleMove);
        document.addEventListener("mouseup", el._handleStop);
      },
      unbind(el, bingding) {
        //解绑时进行注销操作
        document.removeEventListener("mousemove", el._habdleMove);
        document.removeEventListener("mouseup", el._handleStop);
        delete el._habdleMove;
        delete el._handleStop;
        delete el.dom;
      }
    }
  }
};
</script>

<style scoped>
.container .sliderBody {
  position: relative;
  margin: 0 auto;
  height: 30px;
  line-height: 30px;
  background: #cccccc;
  border: 1px solid #ccc;
  /* 让页面上的文字无法被选中 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.sliderBody .slider {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  position: absolute;
  left: -1px;
  top: -1px;
  text-align: center;
  line-height: 30px;
  width: 30px;
  height: 30px;
  cursor: move;
  background: #fff;
  border: 1px solid #ccc;
  z-index: 3;
}
.sliderBody .slider_success {
  border-color: #5cce9a;
  color: #5cce9a;
}
.slider_mask {
  position: absolute;
  top: -1px;
  left: -1px;
  height: 30px;
  border: 1px solid #5cce9a;
  background: #dcfff5;
  border-right: none;
  z-index: 1;
}
.sliderBody > span:nth-of-type(1) {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-family: "微软雅黑";
  cursor: pointer;
  font-size: 12px;
  z-index: 2;
}
.slider i {
  display: block;
  font-size: 16px;
  height: 100%;
  line-height: 30px;
}
</style>
