<template>
    <div class="carousel-wrapper" @mouseover="showArrow" @mouseout="hiddenArrow">
      <ul v-show="slideShow" ref="slide">
          <li v-for="(img,index) in imgArray"
          :key="index"
          >
            <a href="#"><img :src="img" alt=""></a>
          </li>
      </ul>
      <transition name="fade">
          <div v-show="showMark">
              <span class="arrow arrow-left" @click="debounce('p')">&lt;</span>
              <span class="arrow arrow-right" @click="debounce('n')">&gt;</span>
          </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      showMark: false,
      slideShow: true,
      currentIndex: 0,
      timer: null,
      imgArray: [
        require('./1.jpg'),
        require('./2.jpg'),
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2475314098,1324594906&fm=27&gp=0.jpg',
        require('./4.jpg')
      ]
    }
  },
  methods: {
    showArrow () {
      this.showMark = true
    },
    hiddenArrow () {
      this.showMark = false
    },
    debounce (type) {
      // 函数节流
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(this.click.bind(this, type), 80)
    },
    click (alp) {
      // 图片的上一张和下一张
      if (alp === 'p') {
        this.currentIndex--
        if (this.currentIndex < 0) {
          this.currentIndex += this.imgArray.length
        }
      } else {
        this.currentIndex++
        if (this.currentIndex >= this.imgArray.length) {
          this.currentIndex = 0
        }
      }
      let ulDom = this.$refs.slide
      let moveSpace = -this.currentIndex * 100 + '%'
      ulDom.style.left = moveSpace
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.slide.style.left = 0
    })
  }
}
</script>

<style scoped>
.carousel-wrapper {
  user-select: none;
  position: relative;
  width: 500px;
  height: 400px;
  margin: 180px auto;
  overflow: hidden;
  box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
}
.arrow {
  font-size: 24px;
  color: #fff;
  font-family: 'Hiragino Sans GB';
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  position: absolute;
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  z-index: 9;
  transition: all 0.2s ease;
}
.arrow:hover {
  background: rgba(0, 0, 0, 0.8);
  transition: all 0.2s ease;
}
.arrow-left {
  left: 8px;
}
.arrow-right {
  right: 8px;
}
.wrapper-item {
  width: 100%;
  height: 100%;
}
ul {
  position: absolute;
  list-style: none;
  width: 500%;
  margin: 0;
  font-size: 0;
  letter-spacing: -3px;
  padding: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: -1;
}
ul li {
  display: inline-block;
  width: 500px;
  height: 400px;
  padding: 10px;
  box-sizing: border-box;
}
img {
  width: 100%;
  height: 100%;
}

/* 轮播图箭头淡隐淡现 */
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
/* 轮播图画面滚动 */
</style>
