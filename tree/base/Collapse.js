const Transition = {
  beforeEnter(el) {
    // 进入之前 加入动画类 并将css样式清零 存储
    el.classList.add('collapse')
    if (!el.dateSet) {
      el.dateSet = {}
    }
    el.dateSet.paddingTop = el.style.paddingTop;
    el.dateSet.paddingBottom = el.style.paddingBottom;

    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  },
  enter(el, done) {
    // 动画进入时 对el元素进行样式修改触去发动画
    el.dateSet.overflow = el.style.overflow;
    el.style.height = el.scrollHeight + 'px';
    el.style.paddingBottom = el.dateSet.paddingBottom;
    el.style.paddingTop = el.dateSet.paddingTop;
    el.style.overflow = 'hidden';
    setTimeout(() => { //一定要记得触发done回调 后面的800ms试根据class样式里的过渡时间去设置的
      done();
    }, 800)
  },
  afterEnter(el) {
    // 进入动画结束时记得清掉class样式 以及将el元素高度复原 去掉行内样式
    el.classList.remove('collapse');
    el.style.height = '';
    el.style.overflow = el.dateSet.overflow;
  },
  beforeLeave(el) {
    if (!el.dateSet) {
      el.dateSet = {};
    }
    el.dateSet.paddingBottom = el.style.paddingBottom;
    el.dateSet.paddingTop = el.style.paddingTop;
    el.dateSet.overflow = el.style.overflow;

    el.style.height = el.scrollHeight + 'px';
    el.style.overflow = 'hidden';
  },
  leave(el, done) {
    if (el.style.height !== 0) {
      el.classList.add('collapse')
      el.style.paddingBottom = 0;
      el.style.paddingTop = 0;
      setTimeout(() => { //之所以要加个30ms的延迟是因为加过样式之后 改变css高度无法第一时间触发动画
        el.style.height = 0;
      }, 30)
      setTimeout(() => {
        done()
      }, 800)
    }
  },
  afterLeave(el) {
    // 和上面的进入时离开的原理是一样 动画过渡之后让el元素保持干净
    el.classList.remove('collapse');
    el.style.height = '';
    el.style.paddingBottom = el.dateSet.paddingBottom;
    el.style.paddingTop = el.dateSet.paddingTop;
    el.style.overflow = el.dateSet.overflow;
  }
}

// 使用函数化组件 
export default {
  name: 'Collapse',
  functional: true,
  render(h, { children }) {
    const data = {
      on: Transition
    }
    return h('transition', data, children)
  }
}
