<template>
    <ul>
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
</template>


<script>
export default {
  props: {
    nodes: Array,
    deep: {
      type: Number,
      default: 0
    }
  },
  inject: ["currentActive", "active"],
  data() {
    return {};
  },
  name: "Tree1",
  methods: {
    handleExpand(currentNode) {
      //节点展开状态
      if (currentNode.hasOwnProperty("expand")) {
        //如果是可展开的 则执行展开与否操作
        currentNode.expand = !currentNode.expand;
      }
    },
    selected(currentNode) {
      //节点选中状态
      currentNode == this.currentActive.active
        ? this.active(false)
        : this.active(currentNode);
    }
  }
};
</script>

<style scoped>
ul {
  padding: 5px 30px;
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
  content: "";
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
</style>
