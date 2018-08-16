<template>
<transition @before-enter="beforeEnter" @enter="enter"
  @after-enter="afterEnter" @before-leave="beforeLeave"
  @leave="leave" @after-leave="afterLeave"
>
    <ul >
        <li v-for="(item,index) in nodes" :key="index">
            <span 
            @click="handleExpand(item)"
            class="icon"
            :class="[item.children&&(item.expand?'triangle-bottom':'triangle-right')]"
            ></span>
            <span @click="selected(item)" class="title" :class="{'tree-active':item == currentActive.active}">{{item.name}}</span>
              <tree1 v-if="item.children" :nodes="item.children" v-show="item.expand"></tree1>
        </li>
    </ul>
</transition>
</template>


<script>
import Collapse from './Collapse.js'
export default {
  props: {
    nodes: Array,
    deep: {
      type: Number,
      default: 0
    }
  },
  inject: ['currentActive', 'active'],
  data() {
    return {}
  },
  name: 'Tree1',
  methods: {
    handleExpand(currentNode) {
      //节点展开状态
      if (currentNode.hasOwnProperty('expand')) {
        //如果是可展开的 则执行展开与否操作
        currentNode.expand = !currentNode.expand
      }
    },
    selected(currentNode) {
      //节点选中状态
      currentNode == this.currentActive.active
        ? this.active(false)
        : this.active(currentNode)
    },
    beforeEnter(el) {
      el.classList.add('collapse')
      if (!el.dateSet) {
        el.dateSet = {}
      }
      el.dateSet.paddingTop = el.style.paddingTop
      el.dateSet.paddingBottom = el.style.paddingBottom

      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },
    enter(el, done) {
      el.dateSet.overflow = el.style.overflow
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingBottom = el.dateSet.paddingBottom
      el.style.paddingTop = el.dateSet.paddingTop
      el.style.overflow = 'hidden'
    },
    afterEnter(el) {
      el.classList.remove('collapse')
      el.style.height = ''
      el.style.overflow = el.dateSet.overflow
    },
    beforeLeave(el) {
      if (!el.dateSet) {
        el.dateSet = {}
      }
      el.dateSet.paddingBottom = el.style.paddingBottom
      el.dateSet.paddingTop = el.style.paddingTop
      el.dateSet.overflow = el.style.overflow
      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    },
    leave(el, done) {
      if (el.style.height !== 0) {
        el.classList.add('collapse')
        el.style.paddingBottom = 0
        el.style.paddingTop = 0
        setTimeout(() => {
          el.style.height = '0px'
        }, 30)
      }
    },
    afterLeave(el) {
      el.classList.remove('collapse')
      el.style.height = ''
      el.style.paddingBottom = el.dateSet.paddingBottom
      el.style.paddingTop = el.dateSet.paddingTop
      el.style.overflow = el.dateSet.overflow
    }
  },
  components: {
    Collapse
  }
}
</script>

<style scoped>
ul {
  /* padding: 5px 30px; */
  margin: 0;
  list-style: none;
}
ul > li {
  position: relative;
}
span.title {
  user-select: none;
  color: #515a6e;
  padding: 1px 15px;
  cursor: pointer;
  font-family: 微软雅黑;
  font-size: 16px;
  border-radius: 3px;
  display: inline-block;
  transition: background-color 0.2s ease-in-out;
  width: 280px;
  height: 40px;
  line-height: 40px;
  background: #cccccc;
  margin-bottom: 10px;
}
.triangle-bottom::before,
.triangle-right::before {
  font-weight: 400;
  position: absolute;
  content: '';
  height: 0;
  width: 0;
  border: 7px solid transparent;
  top: 13px;
  bottom: 0;
  left: -20px;
  right: 0;
  /* margin: auto 0; */
}

.triangle-right::before {
  border-left-color: rgba(0, 0, 0, 0.75);
}
.triangle-bottom::before {
  border-top-color: rgba(0, 0, 0, 0.75);
}
span:hover {
  background: #eaf4fe;
}
span.tree-active {
  background: #d5e8fc;
}
.collapse {
  transition: all 0.8s linear;
}
</style>
