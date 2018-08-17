### 树型组件

包含的文件

> 1.tree.vue ==> 预计使用render函数实现（暂未完成）
> 
> 3.tree.vue==>使用template模板完成的树组件
> 
> 3.base文件夹 
> - collapse.js===>使用函数式组件返回折叠功能的transition组件

关于tree.vue

使用了依赖注入`currentActive属性和active方法`所有子组件公用一个`currentActive`变量使用`active`方法去激活样式

使用了递归组件 让组件调用自身去完成迭代

使用函数化的`transition`组件去完成展开闭合的过渡动画效果 

---

实现的功能有三个

* expand节点的展开和闭合
* 对于穿进来的数据渲染成节点数
* selected选中高亮状态（一次只有一个高亮）

![tree.gif](https://panali.oss-cn-hangzhou.aliyuncs.com/github%E4%BB%93%E5%BA%93/MyComponent/Tree%E7%BB%84%E4%BB%B6/tree.gif)
=======
