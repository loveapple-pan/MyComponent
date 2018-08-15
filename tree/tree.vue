<script>
export default {
  name: "Tree",
  props: ["nodes"],
  render: function(h) {
    function Product(nodes, parent) {
      //渲染的是子节点 （生成子节点）
      if (nodes) {
        //如果子节点存在的话
        let nodeMap = nodes.map(root => {
          let children = root.children;
          if (children) {
            //如果子节点还存在的话 继续进行递归
            return Product(children, root);
          } else {
            return h("ul", [h("li", [h("span", root.name)])]);
          }
        });
        nodeMap.unshift(h("span", parent.name));
        nodeMap.unshift(
          h(
            "span",
            {
              class: {
                myTriangleContaier: true
              },
              on: {
                click: function(e) {
                  //节点的展开 事件绑定
                  let li = e.currentTarget.parentNode;
                  let ulArray = li.querySelectorAll("span~ul");
                  if (parent.expand) {
                    ulArray.forEach(item => {
                      item.style.display = "none";
                    });
                    parent.expand = false;
                  } else {
                    ulArray.forEach(item => {
                      item.style.display = "block";
                    });
                    parent.expand = true;
                  }
                }
              }
            },
            [
              h("i", {
                //这个是可以点击的三角形小图标
                class: {
                  myTriangle: true
                }
              })
            ]
          )
        );
        return h("ul", [h("li", nodeMap)]);
      } else {
        //若是子节点不存在 则直接渲染根节点
        return h("ul", parent.name);
      }
    }
    //首先对最外层的父节点进行修饰 （主要是递归进行渲染）
    if (this.nodes.length) {
      return h(
        "div",
        {
          class: {
            mytree: true
          }
        },
        this.nodes.map(root => {
          let children = root.children;
          return Product(children, root);
        })
      );
    } else {
      return h("div", "根节点为空");
    }
  }
};
</script>

<style scoped>
.mytree ul {
  list-style: none;
  font-size: 14px;
  font-family: "微软雅黑";
  vertical-align: baseline;
}

.myTriangleContaier {
  position: relative;
  width: 12px;
  height: 12px;
  display: inline-block;
  text-align: center;
  margin-right: 3px;
}

.myTriangleContaier .myTriangle {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 0;
  height: 0;
  margin: auto;
  border: 5px solid transparent;
  border-top-color: black;
}
</style>
